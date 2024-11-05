import React, { FC } from "react";
import { IEvent } from "./IEvent";

export const NewsUpcomingEventsBox: FC<{ events: IEvent[] }> = ({ events }) => {
    return (
        <aside>
            <h2>Proximos Eventos</h2>
            {events.map(event => (
                <div key={event.name}>
                    <h3>{event.name}</h3>
                    <p>{event.description}</p>
                    <p>{event.date}</p>
                </div>
            ))}
        </aside>
    );
}