"use client";

import { Avatar, CardFooter, Container, MdViewer, Tag } from "octagon-ui";

import { formatDate } from "../../../../lib/formatDate";
import { IGuide } from "../../../../lib/guides/IGuide";

export function GuideReader({ title, area, professor, content, publishDate }: IGuide) {
	return (
		<Container align="center">
			<header>
				<h2>{title}</h2>
			</header>
			<div>
				<p>
					Publicado {formatDate(publishDate)} en {""}
					<Tag style={{ height: "0.95em" }} outline color="orange" label={area} />
				</p>
			</div>
			<div></div>
			<MdViewer content={content} />
			<CardFooter>
				<Avatar size={80} src={professor.avatar} alt={professor.name} />
				<div>
					<p>
						Por <strong>{professor.name}</strong> en{" "}
						<Tag style={{ height: "0.95em" }} outline color="orange" label={area} />
					</p>
					<p>
						Publicado el{" "}
						<time dateTime={publishDate}>{new Date(publishDate).toLocaleString()}</time>
					</p>
				</div>
			</CardFooter>
		</Container>
	);
}
