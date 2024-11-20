"use client";
import { useRouter } from "next/navigation";
import { Button, Card, CardFooter, Container, Spinner, TextInput } from "octagon-ui";
import { useActionState, useCallback, useRef, useState, memo } from "react";

import { ManageEmpty } from "../../_components/ManageEmpty";
import { ManageHeader } from "../../_components/ManageHeader";
import { deleteUC, IManageUC, saveUCContent, useGetUCs } from "./actions";

export const UCHeader = () => {
	const router = useRouter();

	return (
		<ManageHeader
			title="Unidades Curriculares"
			label="crear uc"
			onClick={() => {
				const id = globalThis.crypto.randomUUID();
				router.push(`/manage/uc/${id}`);
			}}
		/>
	);
};

export const UCLoader = () => (
	<Container display align="center">
		<Spinner />
	</Container>
);

const UCListItem = ({ id, name, onDelete }: IManageUC & { onDelete: (id: string) => void }) => {
	const [errors, saveNameAction, isPending] = useActionState(saveUCContent, { id });
	const [editing, setEditing] = useState<boolean>(false);
	const [nameValue, setNameValue] = useState<string>(name);

	const ref = useRef<HTMLFormElement>(null);

	const handleDelete = useCallback(() => {
		void deleteUC({ id });
		onDelete(id);
	}, [id, onDelete]);

	return (
		<Card>
			{editing ? (
				<form action={saveNameAction} ref={ref}>
					<TextInput
						label="nombre"
						size="small"
						value={nameValue}
						disabled={isPending}
						onChange={e => setNameValue(e.target.value)}
						errorMessage={errors.name}
					/>
				</form>
			) : (
				<>
					<p>{name}</p>
				</>
			)}
			<CardFooter>
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
				<Button
					icon="Trash"
					variant="tertiary"
					label="eliminar"
					size="small"
					onClick={handleDelete}
				/>
			</CardFooter>
		</Card>
	);
};

const EmptyUC = memo(() => (
	<ManageEmpty
		message="Puedes crear una nueva unidad curricular con el boton de arriba o"
		url={`/manage/uc/${globalThis.crypto.randomUUID()}`}
	/>
));

export const UCList = () => {
	const { ucs, remove } = useGetUCs();

	if (ucs.length === 0) {
		return <EmptyUC />;
	}

	return (
		<>
			{ucs.map(announcement => (
				<UCListItem key={announcement.id} onDelete={remove} {...announcement} />
			))}
		</>
	);
};
