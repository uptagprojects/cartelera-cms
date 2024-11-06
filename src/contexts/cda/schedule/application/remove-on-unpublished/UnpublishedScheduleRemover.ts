import { Service } from "diod";
import { ScheduleRepository } from "../../domain/ScheduleRepository";
import { ScheduleId } from "../../domain/ScheduleId";

@Service()
export class UnpublishedScheduleRemover {
    constructor(private readonly repository: ScheduleRepository) {}

    async remove(id: string): Promise<void> {
        const schedule = await this.repository.search(new ScheduleId(id));
        if (schedule) {
            await this.repository.remove(schedule);
        }
    }
}