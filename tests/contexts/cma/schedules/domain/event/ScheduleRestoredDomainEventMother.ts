import { ScheduleRestoredDomainEvent } from "../../../../../../src/contexts/cma/schedules/domain/events/ScheduleRestoredDomainEvent";
import { SchedulePrimitives } from "../../../../../../src/contexts/cma/schedules/domain/Schedule";
import { ScheduleIdMother } from "../ScheduleIdMother";

export class ScheduleRestoredDomainEventMother {
	static create(params?: Partial<SchedulePrimitives>): ScheduleRestoredDomainEvent {
		return new ScheduleRestoredDomainEvent(ScheduleIdMother.create(params?.id).value);
	}
}
