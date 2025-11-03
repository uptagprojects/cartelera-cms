import { ScheduleArchivedDomainEvent } from "../../../../../../src/contexts/cma/schedules/domain/events/ScheduleArchivedDomainEvent";
import { SchedulePrimitives } from "../../../../../../src/contexts/cma/schedules/domain/Schedule";
import { ScheduleIdMother } from "../ScheduleIdMother";

export class ScheduleArchivedDomainEventMother {
	static create(params?: Partial<SchedulePrimitives>): ScheduleArchivedDomainEvent {
		return new ScheduleArchivedDomainEvent(ScheduleIdMother.create(params?.id).value);
	}
}
