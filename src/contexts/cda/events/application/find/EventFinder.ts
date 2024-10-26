import { Event } from "../../domain/Event";
import { EventDoesNotExists } from "../../domain/EventDoesNotExists";
import { EventId } from "../../domain/EventId";
import { EventRepository } from "../../domain/EventRepository";

export class EventFinder {
	constructor(private readonly repository: EventRepository) {}

	async find(id: string): Promise<Event> {
		const event = await this.repository.search(new EventId(id));
		if (!event) {
			throw new EventDoesNotExists(id);
		}

		return event;
	}
}
