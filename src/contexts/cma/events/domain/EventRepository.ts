import { Criteria } from "../../../shared/domain/criteria/Criteria";
import { Event } from "./Event";
import { EventId } from "./EventId";


export interface EventRepository {
    save(event: Event): Promise<void>;

    search(id: EventId): Promise<Event | null>;

    searchAll(): Promise<Event[]>;

    matching(criteria: Criteria): Promise<Event[]>;

    remove(event: Event): Promise<void>;
}