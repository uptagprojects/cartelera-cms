import { EventBus } from "../../../../shared/domain/event/EventBus";
import { ScheduleRepository } from "../../domain/ScheduleRepository";
import { ScheduleFinder } from "../../domain/ScheduleFinder";
export class ScheduleStartDateUpdater {
    private readonly finder: ScheduleFinder;
    constructor(
        private readonly repository: ScheduleRepository,
        private readonly eventBus: EventBus
    ) {
        this.finder = new ScheduleFinder(repository);
    }
    async update(id: string, date: string): Promise<void> {
        const schedule = await this.finder.find(id);
        schedule.updateStartDate(date);
        await this.repository.save(schedule);
        await this.eventBus.publish(schedule.pullDomainEvents());
    }
}