import { ScheduleNameUpdatedDomainEvent } from "../../../../../../src/contexts/cma/schedules/domain/events/ScheduleNameUpdatedDomainEvent";
import { SchedulePrimitives } from "../../../../../../src/contexts/cma/schedules/domain/Schedule";
import { ScheduleIdMother } from "../ScheduleIdMother";
import { ScheduleNameMother } from "../ScheduleNameMother";

export class ScheduleNameUpdatedDomainEventMother {
	static create(params?: Partial<SchedulePrimitives>): ScheduleNameUpdatedDomainEvent {
		return new ScheduleNameUpdatedDomainEvent(
			ScheduleIdMother.create(params?.id).value,
			ScheduleNameMother.create(params?.name).value
		);
	}
}
