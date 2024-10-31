import { Event } from "../../domain/Event";
import { EventRepository } from "../../domain/EventRepository";
import { EventFinder as DomainEventFinder } from "../../domain/EventFinder";

export class EventFinder {
    constructor(private readonly repository: EventRepository) {}

    async find(id: string): Promise<Event> {
        const finder = new DomainEventFinder(this.repository);

        return finder.find(id);
    }
}