"use client";

import { FC, useEffect, useState } from "react";

import { IGuide } from "../../lib/guides/IGuide";
import styles from "./TV.module.css";
import { TVCardSlides } from "./TVCardSlides";
import { TVContent } from "./TVContent";
import { usePreloadImages } from "./usePreloadImage";

type TVModeProps = {
	guides: IGuide[];
};

export const TV: FC<TVModeProps> = ({ guides }) => {
	const [activeGuideIndex, setActiveGuideIndex] = useState(0);
	usePreloadImages(guides.map(guide => guide.image));

	useEffect(() => {
		const interval = setInterval(() => {
			setActiveGuideIndex(activeGuideIndex => {
				const nextIndex = activeGuideIndex + 1;

				return nextIndex >= guides.length ? 0 : nextIndex;
			});
		}, 5000);

		return () => clearInterval(interval);
	}, [guides.length]);

	const activeGuide = guides[activeGuideIndex] ?? {
		title: "Nada que informar",
		professor: { name: "PNFi" },
		content: "Atento a las proximas novedades"
	};

	return (
		<div className={styles.tvMode}>
			<TVContent
				title={activeGuide.title}
				subtitle={activeGuide.professor.name}
				content={activeGuide.content}
			/>
			<TVCardSlides guides={guides} />
		</div>
	);
};
