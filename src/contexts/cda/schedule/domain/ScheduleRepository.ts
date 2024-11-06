import { Criteria } from "../../../shared/domain/criteria/Criteria";
import { Schedule } from "./Schedule";
import { ScheduleId } from "./ScheduleId";


export abstract class ScheduleRepository {
    abstract save(schedule: Schedule): Promise<void>;
    abstract search(id: ScheduleId): Promise<Schedule | null>;
    abstract matching(criteria: Criteria): Promise<Schedule[]>;
    abstract remove(schedule: Schedule): Promise<void>;
}