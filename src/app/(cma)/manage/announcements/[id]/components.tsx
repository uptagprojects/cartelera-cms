import { useRouter } from "next/navigation";
import { Button, Select, TextArea, TextInput } from "octagon-ui";
import { useState } from "react";

import { IManageAnnouncement } from "../components/IManageAnnouncement";

export const Header = () => {
	const router = useRouter();
	const returnPage = () => {
		router.back();
	};

	return (
		<header>
			<Button
				icon="ArrowLeft"
				size="small"
				variant="tertiary"
				label="Volver"
				onClick={returnPage}
			/>
			<h3>Anuncios</h3>
		</header>
	);
};

export const AnnouncementForm = ({
	id,
	initAnnouncement,
	action
}: {
	id: string;
	initAnnouncement?: IManageAnnouncement;
	action: (announcement: IManageAnnouncement) => void;
}) => {
	const [title, setTitle] = useState(initAnnouncement?.title ?? "");
	const [content, setContent] = useState(initAnnouncement?.content ?? "");
	const [type, setType] = useState(initAnnouncement?.type ?? "info");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		action({ title, content, type, id } as IManageAnnouncement);
	};

	return (
		<form onSubmit={handleSubmit}>
			<TextInput label="Título" value={title} onChange={e => setTitle(e.target.value)} />
			<Select label="Tipo" value={type} onChange={e => setType(e.target.value)}>
				{[
					{ name: "Informacion", value: "info" },
					{ name: "Celebracion", value: "success" },
					{ name: "Alerta", value: "warning" }
				].map(type => (
					<option key={type.value} value={type.value}>
						{type.name}
					</option>
				))}
			</Select>
			<TextArea
				label="Contenido"
				value={content}
				onChange={e => setContent(e.target.value)}
			/>
		</form>
	);
};
