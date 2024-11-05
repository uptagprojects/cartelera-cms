import { Criteria } from "../../../shared/domain/criteria/Criteria";
import { Schedule } from "./Schedule";
import { ScheduleId } from "./ScheduleId";


export interface ScheduleRepository {
    search(id: ScheduleId): Promise<Schedule | null>;
    searchAll(): Promise<Schedule[]>;
    matching(criteria: Criteria): Promise<Schedule[]>;
}