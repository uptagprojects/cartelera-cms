import { Criteria } from "../../../shared/domain/criteria/Criteria";
import { Event } from "./Event";
import { EventId } from "./EventId";

export interface EventRepository {
	search(id: EventId): Promise<Event | null>;

	matching(criteria: Criteria): Promise<Event[]>;
}
