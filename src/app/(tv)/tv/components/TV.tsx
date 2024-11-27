"use client";

import { FC, useEffect, useState } from "react";

import { IActivity, ActivityType } from "../services/IActivity";
import styles from "./TV.module.css";

import { TVContent } from "./TVContent";
import { formatDate } from "../../../../lib/formatDate";

type TVModeProps = {
	activities: IActivity[];
};

const locale: Record<ActivityType, string> = {
	announcement: "Anuncio",
	guide: "Guía",
	event: "Evento",
	course: "Curso",
	schedule: "Horario",
}

export const TV: FC<TVModeProps> = ({ activities }) => {
	const [currentActivity, setCurrentActivity] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentActivity(index => {
				const nextIndex = index + 1;

				return nextIndex >= activities.length ? 0 : nextIndex;
			});
		}, 3000);

		return () => clearInterval(interval);
	}, [activities.length]);

	const activity: IActivity = activities[currentActivity] ?? {
		id: "",
		title: "Nada que informar",
		context: "Atento a las proximas novedades",
		type: "announcement",
		publishedDate: new Date(),
	};

	return (
		<div
			className={styles.tvMode}
			style={{
				backgroundImage: "var(--sunset-gradient)"
			}}
		>
			<TVContent title={activity.title} type={locale[activity.type as ActivityType]} subtitle={formatDate(activity.publishedDate)} content={activity.context.substring(0, 320)} />
		</div>
	);
};
