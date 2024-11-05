import { EventBus } from "../../../../shared/domain/event/EventBus";
import { ScheduleFinder } from "../../domain/ScheduleFinder";
import { ScheduleRepository } from "../../domain/ScheduleRepository";

export class ScheduleEndDateUpdater {
    private readonly finder: ScheduleFinder;
    constructor(
        private readonly repository: ScheduleRepository,
        private readonly eventBus: EventBus
    ) {
        this.finder = new ScheduleFinder(repository);
    }

    async update(id: string, endDate: string): Promise<void> {
        const schedule = await this.finder.find(id);
        schedule.updateEndDate(endDate);
        await this.repository.save(schedule);
        await this.eventBus.publish(schedule.pullDomainEvents());
    }
}