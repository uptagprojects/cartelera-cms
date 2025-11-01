import { Event } from "./Event";
import { EventDoesNotExist } from "./EventDoesNotExist";
import { EventId } from "./EventId";
import { EventRepository } from "./EventRepository";

export class EventFinder {
    constructor(private readonly repository: EventRepository) {}

    async find(id: string): Promise<Event> {
        const event = await this.repository.search(new EventId(id));
        if (!event) {
            throw new EventDoesNotExist(id);
        }

        return event;
    }
}
