"use client";

import { Card, CardHeader } from "octagon-ui";
import React, { FC } from "react";

import { IEvent } from "./IEvent";
import styles from "./News.module.css";

export const NewsUpcomingEventsBox: FC<{ events: IEvent[] }> = ({ events }) => {
	return (
		<Card className={styles.upcomingEvents} hover={false}>
			<CardHeader title="Proximos Eventos" />
			{events.map(event => (
				<div key={event.name}>
					<h3>{event.name}</h3>
					<p>
						{event.startDate} / {event.endDate}
					</p>
				</div>
			))}
		</Card>
	);
};
