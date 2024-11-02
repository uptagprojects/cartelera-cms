import React from "react";

export interface IUC {
	id: string;
	name: string;
}

export interface IGuide {
	id: string;
	title: string;
	content: string;
	uc: IUC;
	status: string;
}

export interface IAttachment {
	id: string;
	url: string;
	size: string;
}

interface EditGuidePageProps {
	params: {
		id: string;
	};
}

const EditGuidePage: React.FC<EditGuidePageProps> = async ({ params }) => {
	const guide: IGuide = await fetch(`/api/guides/${params.id}`).then(res => res.json());
	const ucs = await fetch("/api/uc").then(res => res.json());

	const handleUploadFiles = (files: File[]): void => {
		const formData = new FormData();
		files.forEach(file => {
			formData.append("files", file);
		});
		fetch("/api/attachments", {
			method: "POST",
			body: formData
		})
			.then(res => res.json())
			.then(res => setAttachments(state => [...state, ...res]))
			.catch(err => setUploadError(err.message));
	};
};

export default EditGuidePage;
