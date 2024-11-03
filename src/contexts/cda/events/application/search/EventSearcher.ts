import { Event } from "../../domain/Event";
import { EventId } from "../../domain/EventId";
import { EventRepository } from "../../domain/EventRepository";

export class CourseSearcher {
	constructor(private readonly repository: EventRepository) {}

	async search(id: string): Promise<Event | null> {
		return this.repository.search(new EventId(id));
	}
}
