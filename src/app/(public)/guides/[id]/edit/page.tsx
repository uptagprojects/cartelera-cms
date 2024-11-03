import { Metadata } from "next";

import { IAttachment } from "../../../../../lib/attachments/IAttachment";
import { IEditableGuide } from "../../../../../lib/guides/IEditableGuide";
import { GuideEditor } from "./GuideEditor";

interface EditGuidePageProps {
	params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
	title: "PNFi | Editar Guia",
	description: "Programa Nacional de Formacion en Informatica"
};

export default async function EditGuidePage({ params }: EditGuidePageProps) {
	const { id } = await params;
	const guide: IEditableGuide = await fetch(`/api/manage/guides/${id}`).then(res => res.json());
	const ucs = await fetch("/api/manage/uc").then(res => res.json());
	//const attachments = await fetch(`/api/manange/guide/${id}/attachments`).then(res => res.json());

	/*
	const handleUploadFiles = (files: File[]): void => {
		const formData = new FormData();
		files.forEach(file => {
			formData.append("files", file);
		});
		fetch(`/api/files`, {
			method: "POST",
			body: formData
		})
			.then(res => res.json())
			.then(res => setAttachments(state => [...state, ...res]))
			.catch(err => setUploadError(err.message));
	};*/

	return (
		<GuideEditor
			guide={guide}
			ucs={ucs}
			onUploadFilesAction={() => Promise.resolve([] as IAttachment[])}
		/>
	);
}
