"use client";
import { Button, TextArea, TextInput } from "octagon-ui";
import React from "react";

const guide = {
	title: "Guia 1",
	content: "## markdown content\nhello world",
	date: "2021-08-01",
	uc: "ingles"
};

const EditGuidePage: React.FC = () => {
	const [title, setTitle] = React.useState(guide.title);
	const [content, setContent] = React.useState(guide.content);

	return (
		<article>
			<form>
				<header>
					<TextInput
						size="large"
						label="titulo"
						value={title}
						onChange={e => setTitle(e.target.value)}
					/>
				</header>
				<TextArea
					size="medium"
					label="contenido"
					value={content}
					onChange={e => setContent(e.target.value)}
				/>
				<Button variant="primary" label="Guardar" />
			</form>
		</article>
	);
};

export default EditGuidePage;
