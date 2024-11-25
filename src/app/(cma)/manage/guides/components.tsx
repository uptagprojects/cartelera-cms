"use client";
import { useRouter } from "next/navigation";
import { Button, Card, CardFooter, Container, Spinner, Tag } from "octagon-ui";
import { memo, useCallback, useState } from "react";

import { ManageEmpty } from "../../_components/ManageEmpty";
import { ManageHeader } from "../../_components/ManageHeader";
import { IManageUC } from "../uc/actions";
import { archiveGuide, deleteGuide, publishGuide, restoreGuide, useGetGuides } from "./actions";
import { IManageGuide } from "./types";

export const GuideHeader = () => {
	const router = useRouter();

	return (
		<ManageHeader
			title="Guias"
			label="crear guia"
			onClick={() => {
				const id = globalThis.crypto.randomUUID();
				router.push(`/manage/guides/${id}`);
			}}
		/>
	);
};

export const GuideLoader = () => (
	<Container display align="center">
		<Spinner />
	</Container>
);

const EmptyGuide = memo(() => (
	<ManageEmpty
		message="Puedes crear una nueva guia con el boton de arriba o"
		url={`/manage/guides/${globalThis.crypto.randomUUID()}`}
	/>
));

EmptyGuide.displayName = "EmptyGuide";

const GuideListItem = ({
	id,
	title,
	uc,
	status,
	onDelete
}: IManageGuide & { uc: IManageUC | null; onDelete: (id: string) => void }) => {
	const router = useRouter();
	const [statusValue, setStatusValue] = useState<string>(status);

	const handlePublish = useCallback(async () => {
		await publishGuide({ id });
		setStatusValue("published");
	}, [setStatusValue, id]);

	const handleArchive = useCallback(async () => {
		if (statusValue === "archived") {
			await restoreGuide({ id });
		} else {
			await archiveGuide({ id });
		}

		setStatusValue(state => (state === "archived" ? "draft" : "archived"));
	}, [statusValue, setStatusValue, id]);

	const handleDelete = useCallback(async () => {
		await deleteGuide({ id });
		onDelete(id);
	}, [id, onDelete]);

	return (
		<Card>
			<h4>
				{title} <Tag label={uc?.name ?? "area no disponible"} />
			</h4>
			<CardFooter>
				{statusValue === "draft" && (
					<>
						<Button
							icon="WholeWord"
							variant="primary"
							label="publicar"
							size="small"
							onClick={() => {
								void handlePublish();
							}}
						/>
						<Button
							icon={"Pencil"}
							variant="secondary"
							label={"editar"}
							size="small"
							onClick={() => {
								router.push(`/manage/guides/${id}`);
							}}
						/>
					</>
				)}
				<div>
					<Button
						icon={statusValue === "archived" ? "ArchiveRestore" : "Archive"}
						variant="tertiary"
						label={statusValue === "archived" ? "restaurar" : "archivar"}
						size="small"
						onClick={() => {
							void handleArchive();
						}}
					/>
					<Button
						icon="Trash"
						variant="tertiary"
						label="eliminar"
						size="small"
						onClick={() => {
							void handleDelete();
						}}
					/>
				</div>
			</CardFooter>
		</Card>
	);
};

export const GuideList = ({ ucs }: { ucs: { [k: string]: IManageUC } }) => {
	const { guides, loading, noMoreAvailable, loadMore, remove } = useGetGuides();

	if (!loading && guides.length === 0) {
		return <EmptyGuide />;
	}

	return (
		<>
			{guides.map(guide => (
				<GuideListItem
					key={guide.id}
					onDelete={remove}
					uc={ucs[guide.ucId] ?? null}
					{...guide}
				/>
			))}
			<Container align="center">
				{!noMoreAvailable && loading ? (
					<Spinner />
				) : (
					<Button
						size="small"
						variant="secondary"
						onClick={loadMore}
						label="Cargar más"
					/>
				)}
			</Container>
		</>
	);
};
