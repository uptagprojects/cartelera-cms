import { Criteria } from "../../../shared/domain/criteria/Criteria";
import { Event } from "./Event";
import { EventId } from "./EventId";

export abstract class EventRepository {
	abstract save(event: Event): Promise<void>;

	abstract search(id: EventId): Promise<Event | null>;

	abstract matching(criteria: Criteria): Promise<Event[]>;

	abstract remove(event: Event): Promise<void>;
}
