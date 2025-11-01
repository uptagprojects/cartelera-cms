"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar, Button, Container, Modal, Spinner, Tag, TextInput } from "octagon-ui";
import { memo, useCallback, useId, useState } from "react";

import { ManageEmpty } from "../../_components/ManageEmpty";
import { ManageHeader } from "../../_components/ManageHeader";
import { archiveUser, blockUser, renameUser, restoreUser, updateUserEmail, useGetUsers } from "./actions";
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

enum statusColor {
    "active" = "moss",
    "archived" = "orange",
    "pending_confirmation" = "cyan",
    "blocked" = "magenta"
}

enum statusLabel {
    "active" = "activo",
    "archived" = "archivado",
    "pending_confirmation" = "pendiente",
    "blocked" = "bloqueado"
}

export const UserLoader = () => (
    <Container display align="center">
        <Spinner />
    </Container>
);

const UserListItem = ({ id, name, email, avatar, status }: IManageUser) => {
    const htmlId = useId();
    const [editing, setEditing] = useState<boolean>(false);
    const [nameValue, setNameValue] = useState<string>(name);
    const [emailValue, setEmailValue] = useState<string>(email);
    const [statusValue, setStatusValue] = useState<keyof typeof statusColor>(status as keyof typeof statusColor);
    const [confirmBlock, setConfirmBlock] = useState<boolean>(false);

    const handleEditing = useCallback(async () => {
        if (editing) {
            await renameUser({
                id,
                name: nameValue
            });

            await updateUserEmail({
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

        setStatusValue(state => (state === "archived" ? "active" : "archived"));
    }, [statusValue, setStatusValue, id]);

    const handleBlock = useCallback(() => {
        void blockUser({ id });
        setStatusValue("blocked");
        setConfirmBlock(false);
    }, [id]);

    return (
        <>
            <tr>
                <td>
                    <Link href={`/manage/users/${id}`}>
                        <Avatar size={48} src={avatar} alt="foto de perfil" />
                    </Link>
                </td>
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
                        <p id={htmlId}>
                            <strong>{nameValue}</strong>
                        </p>
                    )}
                </td>
                <td>
                    {editing ? (
                        <TextInput
                            id={htmlId}
                            label="Correo Electrónico"
                            size="small"
                            value={emailValue}
                            onChange={e => setEmailValue(e.target.value)}
                        />
                    ) : (
                        <p id={htmlId}>{emailValue}</p>
                    )}
                </td>
                <td>
                    <Tag color={statusColor[statusValue]} label={statusLabel[statusValue]} />
                </td>
                <td>
                    <Button
                        icon={editing ? "Check" : "Pencil"}
                        variant="secondary"
                        label={editing ? "guardar" : "editar"}
                        size="small"
                        onClick={() => {
                            void handleEditing();
                        }}
                    />
                </td>
                <td>
                    {statusValue === "active" || statusValue === "pending_confirmation" ? (
                        <>
                            <Button
                                icon="Archive"
                                variant="tertiary"
                                label="archivar"
                                size="small"
                                onClick={() => {
                                    void handleArchive();
                                }}
                            />
                            <Button
                                icon="UserX"
                                variant="tertiary"
                                label="bloquear"
                                size="small"
                                onClick={() => {
                                    setConfirmBlock(true);
                                }}
                            />
                        </>
                    ) : (
                        <Button
                            icon="UserCheck"
                            variant="tertiary"
                            label="restaurar"
                            size="small"
                            onClick={() => {
                                void restoreUser({ id });
                                setStatusValue("active");
                            }}
                        />
                    )}
                    <Modal
                        open={confirmBlock}
                        actionLabel="Bloquear"
                        closeLabel="Cancelar"
                        onAction={handleBlock}
                        onClose={() => setConfirmBlock(false)}
                    >
                        <Container align="center">¿Estás seguro de que deseas bloquear a este usuario?</Container>
                    </Modal>
                </td>
            </tr>
        </>
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
            <tbody>
                {users.map(user => (
                    <UserListItem key={user.id} {...user} />
                ))}
            </tbody>
        </table>
    );
};
