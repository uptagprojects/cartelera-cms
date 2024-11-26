"use client";
import { useRouter } from "next/navigation";
import { Button, Container, Spinner, TextInput } from "octagon-ui";
import { memo, useCallback, useId, useState } from "react";

import { ManageEmpty } from "../../_components/ManageEmpty";
import { ManageHeader } from "../../_components/ManageHeader";
import { deleteUC, IManageUC, updateUCName, useGetUCs } from "./actions";
import { IManageUser } from "./types";

export const UserHeader = () => {
	const router = useRouter();

	return (
		<ManageHeader
			title="Usuarios"
			label="crear usuario"
			onClick={() => {
				const id = globalThis.crypto.randomUUID();
				router.push(`/manage/users/${id}`);
			}}
		/>
	);
};

export const UserLoader = () => (
	<Container display align="center">
		<Spinner />
	</Container>
);

const UserListItem = ({ id, name, email }: IManageUser & { onBlock: (id: string) => void }) => {
	const htmlId = useId();
	const [editing, setEditing] = useState<boolean>(false);
	const [nameValue, setNameValue] = useState<string>(name);
	const [emailValue, setEmailValue] = useState<string>(email);
	const [statusValue, setStatusValue] = useState<string>(status);

	const handleEditing = useCallback(async () => {
		if (editing) {
			await renameUser({
				id,
				name: nameValue
			});

			await updateEmail({
				id,
				email: emailValue
			});
		}
		setEditing(state => !state);
	}, [editing, nameValue, emailValue, setEditing, id]);

	const handleArchive = useCallback(async () => {
		if (statusValue === "archived") {
			await restoreUser({ id });
		} else {
			await archiveUser({ id });
		}

		setStatusValue(state => (state === "archived" ? "draft" : "archived"));
	}, [statusValue, setStatusValue, id]);

	const handleBlock = useCallback(() => {
		void blockUser({ id });
	}, [id, onBlock]);

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
						icon="UserX"
						variant="tertiary"
						label="eliminar"
						size="small"
						onClick={() => {
							void handleBlock();
						}}
					/>
				</div>
			</td>
		</tr>
	);
};

const EmptyUsers = memo(() => (
	<ManageEmpty
		message="Puedes crear un nuevo usuario con el boton de arriba o"
		url={`/manage/users/${globalThis.crypto.randomUUID()}`}
	/>
));

EmptyUsers.displayName = "EmptyUsers";

export const UserList = () => {
	const { users } = useGetUsers();

	if (users.length === 0) {
		return <EmptyUsers />;
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
				{users.map(user => (
					<UserListItem key={user.id} {...user} />
				))}
			</tbody>
		</table>
	);
};
