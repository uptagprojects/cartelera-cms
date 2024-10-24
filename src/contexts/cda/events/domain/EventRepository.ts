import { Event } from "./Event";
import { EventId } from "./EventId";

export interface EventRepository {

    search(id: EventId): Promise<Event | null>

}