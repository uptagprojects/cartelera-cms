"use client";
import { Alert, Button, FileUploader, Select, TextEditor, TextInput } from "octagon-ui";
import { useState } from "react";

import { IAttachment } from "../../../../../lib/attachments/IAttachment";
import { IEditableGuide } from "../../../../../lib/guides/IEditableGuide";
import { IUC } from "../../../../../lib/uc/IUC";

interface IGuideEditorProps {
	guide: IEditableGuide;
	ucs: IUC[];
	onUploadFilesAction: (files: File[]) => Promise<IAttachment[]>;
}

export function GuideEditor({ guide, ucs, onUploadFilesAction }: IGuideEditorProps) {
	const [title, setTitle] = useState(guide.title);
	const [content, setContent] = useState(guide.content);
	const [attachments, setAttachments] = useState<IAttachment[]>([]);
	const [ucId, setUcId] = useState<string>(guide.ucId);
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
		<article>
			{uploadError && (
				<Alert
					type="error"
					title="Ha ocurrido un error al subir los archivos"
					message={uploadError}
					onClose={() => setUploadError(null)}
				/>
			)}
			<form>
				<header>
					<TextInput
						size="large"
						label="titulo"
						value={title}
						onChange={e => setTitle(e.target.value)}
					/>
					<Select
						label="Unidad Curricular"
						value={ucId}
						onChange={e => setUcId(e.target.value)}
					>
						{ucs.map((uc: IUC) => (
							<option key={uc.id} value={uc.id}>
								{uc.name}
							</option>
						))}
					</Select>
				</header>
				<TextEditor value={content} onChange={setContent} />
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
				<FileUploader
					label="Agrega mas archivos aqui"
					onUploadFiles={files => {
						handleUploadFiles(files);
					}}
				/>
				<Button variant="primary" label="Guardar" />
			</form>
		</article>
	);
}
