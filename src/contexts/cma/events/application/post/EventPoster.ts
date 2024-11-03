import { EventBus } from "../../../../shared/domain/event/EventBus";
import { Event } from "../../domain/Event";
import { EventRepository } from "../../domain/EventRepository";

export class EventPoster {
	constructor(
		private readonly repository: EventRepository,
		private readonly eventBus: EventBus
	) {}

	async post(
		id: string,
		name: string,
		location: string,
		startDate: string,
		endDate: string
	): Promise<void> {
		const event = Event.create(id, name, location, startDate, endDate);
		await this.repository.save(event);
		await this.eventBus.publish(event.pullDomainEvents());
	}
}
