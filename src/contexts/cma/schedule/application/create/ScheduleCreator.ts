import { EventBus } from "../../../../shared/domain/event/EventBus";
import { Schedule } from "../../domain/Schedule";
import { ScheduleRepository } from "../../domain/ScheduleRepository";

export class ScheduleCreator {
    constructor(
        private readonly repository: ScheduleRepository,
        private readonly eventBus: EventBus
    ) { }

    async create(id: string, startDate: string, endDate: string): Promise<void> {
        const schedule = Schedule.create(id, startDate, endDate);
        await this.repository.save(schedule);
        await this.eventBus.publish(schedule.pullDomainEvents());
    }
}
