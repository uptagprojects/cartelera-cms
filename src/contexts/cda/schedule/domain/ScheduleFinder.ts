import { Schedule } from "./Schedule";
import { ScheduleDoesNotExist } from "./ScheduleDoesNotExist";
import { ScheduleId } from "./ScheduleId";
import { ScheduleRepository } from "./ScheduleRepository";

export class ScheduleFinder {
	constructor(private readonly repository: ScheduleRepository) {}

	async find(id: string): Promise<Schedule> {
		const schedule = await this.repository.search(new ScheduleId(id));
		if (!schedule) {
			throw new ScheduleDoesNotExist(id);
		}

		return schedule;
	}
}
