"use client";
import { Button, FileUploader, Select, TextEditor, TextInput } from "octagon-ui";
import { useActionState, useState } from "react";

import { IManageUC } from "../../uc/actions";
import { IManageGuide, IManageGuideAttachment } from "../types";
import { saveGuide } from "./actions";

export const GuideAttachmentForm = ({ guideId }: { guideId: string }) => {
	const [attachments, setAttachments] = useState<IManageGuideAttachment[]>([]);
	const [uploadError, setUploadError] = useState<string | null>(null);

	const handleUploadFiles = (files: File[]): void => {
		/*onUploadFilesAction(files)
			.then(newAttachments => {
				setAttachments([...attachments, ...newAttachments]);
			})
			.catch((error: unknown) => {
				setUploadError(
					error instanceof Error
						? error.message
						: "Ha ocurrido un error al subir los archivos"
				);
			});*/
	};

	return (
		<section>
			<h2>Archivos adjuntos</h2>
			<FileUploader
				label="Agrega mas archivos aqui"
				onUploadFiles={files => {
					handleUploadFiles(files);
				}}
			/>
			{attachments.map(attachment => (
				<div key={attachment.id}>
					<a href={attachment.url}>{attachment.url}</a>
					<Button
						variant="tertiary"
						label="Eliminar"
						onClick={() =>
							setAttachments(attachments.filter(a => a.id !== attachment.id))
						}
					/>
				</div>
			))}
		</section>
	);
};

export const GuideForm = ({
	id,
	ucs,
	initGuide
}: {
	id: string;
	ucs: IManageUC[];
	initGuide: IManageGuide | null;
}) => {
	const [errors, saveFormAction, isPending] = useActionState(saveGuide, { initGuide });
	const [title, setTitle] = useState(initGuide?.title ?? "");
	const [content, setContent] = useState(initGuide?.content ?? "");
	const [ucId, setUcId] = useState(initGuide?.ucId ?? "");

	return (
		<>
			<form action={saveFormAction}>
				<input type="hidden" name="id" value={id} />
				<input type="hidden" name="content" value={content} />
				<header>
					<TextInput
						size="medium"
						label="titulo"
						name="title"
						value={title}
						disabled={isPending}
						errorMessage={errors.title}
						onChange={e => setTitle(e.target.value)}
					/>
					<Select
						label="Unidad Curricular"
						name="ucId"
						value={ucId}
						disabled={isPending}
						errorMessage={errors.ucId}
						onChange={e => setUcId(e.target.value)}
					>
						{ucs.map(uc => (
							<option key={uc.id} value={uc.id}>
								{uc.name}
							</option>
						))}
					</Select>
				</header>

				<TextEditor value={content} onChange={setContent} />

				<Button type="submit" disabled={isPending} label="Guardar" />
			</form>
			<GuideAttachmentForm guideId={id} />
		</>
	);
};
