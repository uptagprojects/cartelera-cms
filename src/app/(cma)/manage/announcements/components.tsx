"use client";

import { useRouter } from "next/navigation";
import {
	Button,
	Card,
	CardFooter,
	CardHeader,
	Container,
	Spinner,
	TextArea,
	TextInput
} from "octagon-ui";
import { Suspense, useActionState, useCallback, useRef, useState } from "react";

import { ManageEmpty } from "../../_components/ManageEmpty";
import { ManageHeader } from "../../_components/ManageHeader";
import {
	archiveAnnouncement,
	deleteAnnouncement,
	IManageAnnouncement,
	publishAnnouncement,
	restoreAnnouncement,
	saveAnnouncementContent,
	useGetAnnouncements
} from "./actions";

export const AnnouncementHeader = () => {
	const router = useRouter();

	return (
		<ManageHeader
			title="Anuncios"
			label="crear anuncio"
			onClick={() => {
				const id = globalThis.crypto.randomUUID();
				router.push(`/manage/announcements/${id}`);
			}}
		/>
	);
};

const AnnouncementLoader = () => (
	<Container display align="center">
		<Spinner />
	</Container>
);

const AnnouncementListItem = ({
	id,
	title,
	type,
	content,
	status,
	onDelete
}: IManageAnnouncement & { onDelete: (id: string) => void }) => {
	const [errors, saveContentAction, isPending] = useActionState(saveAnnouncementContent, { id });
	const [editing, setEditing] = useState<boolean>(false);
	const [titleValue, setTitleValue] = useState<string>(title);
	const [contentValue, setContentValue] = useState<string>(content);
	const [statusValue, setStatusValue] = useState<string>(status);
	const ref = useRef<HTMLFormElement>(null);

	const handlePublish = useCallback(async () => {
		await publishAnnouncement({ id });
		setStatusValue("published");
	}, [setStatusValue, id]);

	const handleArchive = useCallback(async () => {
		if (statusValue === "archived") {
			await restoreAnnouncement({ id });
		} else {
			await archiveAnnouncement({ id });
		}

		setStatusValue(state => (state === "archived" ? "draft" : "archived"));
	}, [statusValue, setStatusValue, id]);

	const handleDelete = useCallback(async () => {
		await deleteAnnouncement({ id });
		onDelete(id);
	}, [id, onDelete]);

	return (
		<Card>
			{editing ? (
				<form action={saveContentAction} ref={ref}>
					<TextInput
						label="titulo"
						size="small"
						value={titleValue}
						disabled={isPending}
						onChange={e => setTitleValue(e.target.value)}
						errorMessage={errors.title}
					/>
					<TextArea
						label="contenido"
						size="small"
						value={contentValue}
						disabled={isPending}
						onChange={e => setContentValue(e.target.value)}
						errorMessage={errors.content}
					/>
				</form>
			) : (
				<>
					<CardHeader title={titleValue} subtitle={type} />
					<p>{contentValue}</p>
				</>
			)}
			<CardFooter>
				{statusValue === "draft" && (
					<div>
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
							icon={editing ? "Check" : "Pencil"}
							variant="secondary"
							label={editing ? "terminar edicion" : "editar"}
							size="small"
							onClick={() => {
								setEditing(state => {
									if (state) {
										ref.current?.requestSubmit();
									}

									return !state;
								});
							}}
						/>
					</div>
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

export const AnnouncementList = () => {
	const { announcements, loadMore, noMoreAvailable, remove } = useGetAnnouncements();

	if (announcements.length === 0) {
		return (
			<ManageEmpty
				message="Puedes crear un nuevo anuncio con el boton de arriba o"
				url={`/manage/announcements/${globalThis.crypto.randomUUID()}`}
			/>
		);
	}

	return (
		<Suspense fallback={<AnnouncementLoader />}>
			{announcements.map(announcement => (
				<AnnouncementListItem key={announcement.id} onDelete={remove} {...announcement} />
			))}
			<Container align="center">
				{!noMoreAvailable && (
					<Button
						size="small"
						variant="secondary"
						onClick={loadMore}
						label="Cargar más"
					/>
				)}
			</Container>
		</Suspense>
	);
};
