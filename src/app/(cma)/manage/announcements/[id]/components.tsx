"use client";
import { Button, Select, TextArea, TextInput } from "octagon-ui";
import { useActionState, useState } from "react";

import { IManageAnnouncement } from "../types";
import { saveAnnouncement } from "./actions";

export const AnnouncementForm = ({
	id,
	initAnnouncement
}: {
	id: string;
	initAnnouncement?: IManageAnnouncement;
}) => {
	const [errors, saveFormAction, isPending] = useActionState(saveAnnouncement, {});
	const [title, setTitle] = useState(initAnnouncement?.title ?? "");
	const [content, setContent] = useState(initAnnouncement?.content ?? "");
	const [type, setType] = useState(initAnnouncement?.type ?? "info");

	return (
		<form action={saveFormAction}>
			<input type="hidden" name="id" value={id} />
			<TextInput
				label="Título"
				name="title"
				value={title}
				disabled={isPending}
				errorMessage={errors.title}
				onChange={e => setTitle(e.target.value)}
			/>
			<Select
				label="Tipo"
				name="type"
				value={type}
				disabled={isPending}
				errorMessage={errors.type}
				onChange={e => setType(e.target.value)}
			>
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
				name="content"
				errorMessage={errors.content}
				disabled={isPending}
				value={content}
				onChange={e => setContent(e.target.value)}
			/>
			<Button type="submit" disabled={isPending} label="Guardar" />
		</form>
	);
};
