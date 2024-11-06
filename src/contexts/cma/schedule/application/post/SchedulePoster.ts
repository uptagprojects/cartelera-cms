import { EventBus } from "../../../../shared/domain/event/EventBus";
import { Schedule } from "../../domain/Schedule";
import { ScheduleRepository } from "../../domain/ScheduleRepository";
export class SchedulePoster {
    constructor(
        private readonly repository: ScheduleRepository,
        private readonly eventBus: EventBus
    ) { }
    async post(id: string, name: string, startDate: string, finishDate: string): Promise<void> {
        const schedule = Schedule.create(id, name, startDate, finishDate);
        await this.repository.save(schedule);
        await this.eventBus.publish(schedule.pullDomainEvents());
    }
}