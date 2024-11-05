import { Schedule } from "../../domain/Schedule";
import { ScheduleRepository } from "../../domain/ScheduleRepository";
import { ScheduleFinder as DomainScheduleFinder } from "../../domain/ScheduleFinder"

export class ScheduleFinder {
    constructor(private readonly repository: ScheduleRepository) { }

    async find(id: string): Promise<Schedule> {
        const finder = new DomainScheduleFinder(this.repository);

        return finder.find(id);
    }
}
