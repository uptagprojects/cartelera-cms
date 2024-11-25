"use client";
import { useRouter } from "next/navigation";
import { Button, Container, Spinner, TextInput } from "octagon-ui";
import { memo, useCallback, useId, useState } from "react";

import { ManageEmpty } from "../../_components/ManageEmpty";
import { ManageHeader } from "../../_components/ManageHeader";
import { deleteUC, IManageUC, updateUCName, useGetUCs } from "./actions";

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
	const htmlId = useId();
	const [editing, setEditing] = useState<boolean>(false);
	const [nameValue, setNameValue] = useState<string>(name);

	const handleEditing = useCallback(async () => {
		if (editing) {
			await updateUCName({
				id,
				name: nameValue
			});
		}
		setEditing(state => !state);
	}, [editing, nameValue, setEditing, id]);

	const handleDelete = useCallback(() => {
		void deleteUC({ id });
		onDelete(id);
	}, [id, onDelete]);

	return (
		<tr>
			<td>
				{editing ? (
					<TextInput
						id={htmlId}
						label="nombre"
						size="small"
						value={nameValue}
						onChange={e => setNameValue(e.target.value)}
					/>
				) : (
					<p id={htmlId}>{nameValue}</p>
				)}
			</td>
			<td>
				<Button
					icon={editing ? "Check" : "Pencil"}
					variant="secondary"
					label={editing ? "terminar edicion" : "editar"}
					size="small"
					onClick={() => {
						void handleEditing();
					}}
				/>
				<Button
					icon="Trash"
					variant="tertiary"
					label="eliminar"
					size="small"
					onClick={handleDelete}
				/>
			</td>
		</tr>
	);
};

const EmptyUC = memo(() => (
	<ManageEmpty
		message="Puedes crear una nueva unidad curricular con el boton de arriba o"
		url={`/manage/uc/${globalThis.crypto.randomUUID()}`}
	/>
));

EmptyUC.displayName = "EmptyUC";

export const UCList = () => {
	const { ucs, remove } = useGetUCs();

	if (ucs.length === 0) {
		return <EmptyUC />;
	}

	return (
		<table>
			<thead>
				<tr>
					<th>Nombre</th>
					<th>Acciones</th>
				</tr>
			</thead>
			<tbody>
				{ucs.map(announcement => (
					<UCListItem key={announcement.id} onDelete={remove} {...announcement} />
				))}
			</tbody>
		</table>
	);
};
