import { EventBus } from "../../../../shared/domain/event/EventBus";
import { ScheduleFinder } from "../../domain/ScheduleFinder";
import { ScheduleRepository } from "../../domain/ScheduleRepository";

export class ScheduleRemover {
    private readonly finder: ScheduleFinder;

    constructor(
        private readonly repository: ScheduleRepository,
        private readonly eventBus: EventBus
    ) {
        this.finder = new ScheduleFinder(repository);
    }

    async remove(id: string): Promise<void> {
        const schedule = await this.finder.find(id);
        await this.repository.remove(schedule);
        await this.eventBus.publish(schedule.pullDomainEvents());
    }
}