import { EventBus } from "../../../../shared/domain/event/EventBus";
import { EventFinder } from "../../domain/EventFinder";
import { EventRepository } from "../../domain/EventRepository";

export class EventEndDateUpdater {
	private readonly finder: EventFinder;
	constructor(
		private readonly repository: EventRepository,
		private readonly eventBus: EventBus
	) {
		this.finder = new EventFinder(repository);
	}

	async update(id: string, endDate: string): Promise<void> {
		const event = await this.finder.find(id);
		event.updateEndDate(endDate);
		await this.repository.save(event);
		await this.eventBus.publish(event.pullDomainEvents());
	}
}
