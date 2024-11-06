import { EventBus } from "../../../../shared/domain/event/EventBus";
import { ScheduleFinder } from "../../domain/ScheduleFinder";
import { ScheduleRepository } from "../../domain/ScheduleRepository";
export class SchedulePublisher {
	private readonly finder: ScheduleFinder;
	constructor(
		private readonly repository: ScheduleRepository,
		private readonly eventBus: EventBus
	) {
		this.finder = new ScheduleFinder(repository);
	}
	async publish(id: string): Promise<void> {
		const schedule = await this.finder.find(id);
		schedule.publish();
		await this.repository.save(schedule);
		await this.eventBus.publish(schedule.pullDomainEvents());
	}
}