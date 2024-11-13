import { Criteria } from "../../../shared/domain/criteria/Criteria";
import { Schedule } from "./Schedule";
import { ScheduleId } from "./ScheduleId";

export interface ScheduleRepository {
	save(schedule: Schedule): Promise<void>;

	search(id: ScheduleId): Promise<Schedule | null>;

	matching(criteria: Criteria): Promise<Schedule[]>;
}
