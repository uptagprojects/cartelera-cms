"use client";

import { MdViewer } from "octagon-ui";

import { IGuide } from "../../../../lib/guides/IGuide";

export function GuideReader({ title, area, content, publishDate }: IGuide) {
	return (
		<article>
			<header>
				<h1>{title}</h1>
				<h3>{area}</h3>
			</header>
			<MdViewer content={content} />
			<footer>
				<time dateTime={publishDate}>{new Date(publishDate).toLocaleString()}</time>
			</footer>
		</article>
	);
}
