import { Event } from "../../domain/Event";
import { EventRepository } from "../../domain/EventRepository";

export class AllEventsSearcher {
    constructor(private readonly repository: EventRepository) {}

    async searchAll(): Promise<Event[]> {
        return this.repository.searchAll();
    }
}
