"use client";
import { Alert, Button, Select, TextEditor, TextInput } from "octagon-ui";
import { useActionState, useCallback, useState } from "react";

import { customFetch } from "../../../../../lib/fetch";
import { IManageUC } from "../../uc/actions";
import { IManageGuide } from "../types";
import { saveGuide } from "./actions";
/*
export const GuideAttachmentForm = ({ guideId }: { guideId: string }) => {
	const [attachments, setAttachments] = useState<IManageGuideAttachment[]>([]);
	const [uploadError, setUploadError] = useState<string | null>(null);

	const handleUploadFiles = (files: File[]): void => {
		onUploadFilesAction(files)
			.then(newAttachments => {
				setAttachments([...attachments, ...newAttachments]);
			})
			.catch((error: unknown) => {
				setUploadError(
					error instanceof Error
						? error.message
						: "Ha ocurrido un error al subir los archivos"
				);
			});
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
};*/

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
	const [imageUploadError, setImageUploadError] = useState<string | null>(null);

	const handleImageUpload = useCallback(async (image: File, blobUrl: string): Promise<void> => {
		const formData = new FormData();
		formData.append("image", image);
		try {
			const res = await customFetch(`/api/manage/image/upload`, {
				method: "POST",
				body: formData
			});
			const { url } = await res.json();

			setContent(c => c.replace(blobUrl, url));
		} catch {
			setImageUploadError("error subiendo imagen");
		}
	}, []);

	return (
		<>
			{imageUploadError && (
				<Alert
					title="Ocurrió un error subiendo la imagen"
					message={imageUploadError}
					onClose={() => {
						setImageUploadError(null);
					}}
				/>
			)}
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
						errorMessage={errors?.title}
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

				<TextEditor
					value={content}
					onChange={setContent}
					uploadRequest={handleImageUpload}
				/>

				<Button type="submit" disabled={isPending} label="Guardar" />
			</form>
			{/*<GuideAttachmentForm guideId={id} />*/}
		</>
	);
};
