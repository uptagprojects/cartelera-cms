"use client";

import { FC, useEffect, useState } from "react";

import { IActivity } from "../services/IActivity";
import { usePreloadImages } from "../services/usePreloadImages";
import styles from "./TV.module.css";
import { TVCardSlides } from "./TVCardSlides";
import { TVContent } from "./TVContent";

type TVModeProps = {
	activities: IActivity[];
};

export const TV: FC<TVModeProps> = ({ activities }) => {
	const [currentActivity, setCurrentActivity] = useState(0);
	usePreloadImages(activities.map(act => act.image));

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentActivity(index => {
				const nextIndex = index + 1;

				return nextIndex >= activities.length ? 0 : nextIndex;
			});
		}, 3000);

		return () => clearInterval(interval);
	}, [activities.length]);

	const activity = activities[currentActivity] ?? {
		id: "",
		event: "Nada que informar",
		content: "Atento a las proximas novedades",
		image: ""
	};

	return (
		<div
			className={styles.tvMode}
			style={{
				backgroundImage: URL.canParse(activity.image)
					? `url(${activity.image})`
					: "var(--sunset-gradient)"
			}}
		>
			<TVContent title={activity.event} subtitle={""} content={activity.content} />
			<TVCardSlides activities={activities} currentIndex={currentActivity} />
		</div>
	);
};
