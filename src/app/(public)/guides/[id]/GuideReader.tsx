"use client";

import { Avatar, Container, MdViewer, Tag } from "octagon-ui";

import { IGuide } from "../../../../lib/guides/IGuide";

export function GuideReader({ title, area, professor, content, publishDate }: IGuide) {
	return (
		<Container align="center">
			<header>
				<h2>{title}</h2>
			</header>
			<time dateTime={publishDate}>
				Publicado en {new Date(publishDate).toLocaleString()} en{" "}
				<Tag outline color="orange" label={area} />
			</time>
			<MdViewer content={content} />
			<footer>
				<Avatar size={120} src={professor.avatar} alt={professor.name} />
				<div>
					<p>{professor.name}</p>
					<p>Publicado en {area}</p>
				</div>
			</footer>
		</Container>
	);
}
