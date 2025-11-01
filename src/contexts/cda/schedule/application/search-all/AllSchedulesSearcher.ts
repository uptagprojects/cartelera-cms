import { Schedule } from "../../domain/Schedule";
import { ScheduleRepository } from "../../domain/ScheduleRepository";

export class AllSchedulesSearcher {
    constructor(private readonly repository: ScheduleRepository) {}

    async searchAll(): Promise<Schedule[]> {
        return this.repository.searchAll();
    }
}
