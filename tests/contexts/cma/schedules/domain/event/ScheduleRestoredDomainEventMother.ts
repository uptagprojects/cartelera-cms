import { ScheduleRestoredDomainEvent } from "../../../../../../src/contexts/cma/schedules/domain/event/ScheduleRestoredDomainEvent";
import { ScheduleIdMother } from "../ScheduleIdMother";

export class ScheduleRestoredDomainEventMother {
	static create(id?: string): ScheduleRestoredDomainEvent {
		return new ScheduleRestoredDomainEvent(id ?? ScheduleIdMother.create().value);
	}
}
