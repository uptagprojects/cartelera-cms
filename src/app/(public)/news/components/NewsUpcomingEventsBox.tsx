import { Card, CardHeader } from "octagon-ui";
import React, { FC } from "react";

import { IEvent } from "./IEvent";

export const NewsUpcomingEventsBox: FC<{ events: IEvent[] }> = ({ events }) => {
	return (
		<Card>
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
