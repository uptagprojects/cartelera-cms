"use client";

import { useRouter } from "next/navigation";
import { Button, Card, CardFooter, CardHeader, Container, Spinner, TextArea, TextInput } from "octagon-ui";
import { Suspense, useCallback, useState } from "react";

import { formatDate } from "../../../../lib/formatDate";
import { ManageEmpty } from "../../_components/ManageEmpty";
import { ManageHeader } from "../../_components/ManageHeader";
import { ManageListContainer } from "../../_components/ManageListContainer";
import {
    archiveAnnouncement,
    deleteAnnouncement,
    publishAnnouncement,
    restoreAnnouncement,
    updateAnnouncementContent,
    updateAnnouncementTitle,
    useGetAnnouncements
} from "./actions";
import { IManageAnnouncement } from "./types";

enum emojis {
    "info" = "📢",
    "success" = "🎉",
    "warning" = "⚠️",
    "error" = "🚨"
}

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
    publishDate,
    onDelete
}: IManageAnnouncement & { onDelete: (id: string) => void }) => {
    const [editing, setEditing] = useState<boolean>(false);
    const [titleValue, setTitleValue] = useState<string>(title);
    const [contentValue, setContentValue] = useState<string>(content);
    const [statusValue, setStatusValue] = useState<string>(status);

    const handlePublish = useCallback(async () => {
        await publishAnnouncement({ id });
        setStatusValue("published");
    }, [setStatusValue, id]);

    const handleEditing = useCallback(async () => {
        if (editing) {
            await updateAnnouncementTitle({
                id,
                title: titleValue
            });

            await updateAnnouncementContent({
                id,
                content: contentValue
            });
        }
        setEditing(state => !state);
    }, [editing, titleValue, contentValue, setEditing, id]);

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
                <>
                    <TextInput
                        label="titulo"
                        size="small"
                        value={titleValue}
                        onChange={e => setTitleValue(e.target.value)}
                    />
                    <TextArea
                        label="contenido"
                        size="small"
                        value={contentValue}
                        onChange={e => setContentValue(e.target.value)}
                    />
                </>
            ) : (
                <>
                    <CardHeader
                        title={`${emojis[type as keyof typeof emojis]} ${titleValue}`}
                        subtitle={statusValue === "published" ? `publicado el ${formatDate(publishDate)}` : undefined}
                    />
                    <p>{contentValue}</p>
                </>
            )}
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
                            icon={editing ? "Check" : "Pencil"}
                            variant="secondary"
                            label={editing ? "terminar edicion" : "editar"}
                            size="small"
                            onClick={() => {
                                void handleEditing();
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

export const AnnouncementList = () => {
    const { announcements, loading, loadMore, noMoreAvailable, remove } = useGetAnnouncements();

    if (!loading && announcements.length === 0) {
        return (
            <ManageEmpty
                message="Puedes crear un nuevo anuncio con el boton de arriba o"
                url={`/manage/announcements/${globalThis.crypto.randomUUID()}`}
            />
        );
    }

    return (
        <Suspense fallback={<AnnouncementLoader />}>
            <ManageListContainer>
                {announcements.map(announcement => (
                    <AnnouncementListItem key={announcement.id} onDelete={remove} {...announcement} />
                ))}
            </ManageListContainer>
            <Container align="center">
                {!noMoreAvailable && <Button size="small" variant="secondary" onClick={loadMore} label="Cargar más" />}
            </Container>
        </Suspense>
    );
};
