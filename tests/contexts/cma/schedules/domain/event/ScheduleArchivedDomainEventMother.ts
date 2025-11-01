import { ScheduleArchivedDomainEvent } from "../../../../../../src/contexts/cma/schedules/domain/event/ScheduleArchivedDomainEvent";
import { ScheduleIdMother } from "../ScheduleIdMother";

export class ScheduleArchivedDomainEventMother {
	static create(id?: string): ScheduleArchivedDomainEvent {
		return new ScheduleArchivedDomainEvent(id ?? ScheduleIdMother.create().value);
	}
}
