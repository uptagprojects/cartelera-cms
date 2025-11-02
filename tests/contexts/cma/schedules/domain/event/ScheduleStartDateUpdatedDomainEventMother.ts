import { ScheduleStartDateUpdatedDomainEvent } from "../../../../../../src/contexts/cma/schedules/domain/event/ScheduleStartDateUpdatedDomainEvent";
import { SchedulePrimitives } from "../../../../../../src/contexts/cma/schedules/domain/Schedule";
import { ScheduleIdMother } from "../ScheduleIdMother";
import { ScheduleStartDateMother } from "../ScheduleStartDateMother";

export class ScheduleStartDateUpdatedDomainEventMother {
	static create(params?: Partial<SchedulePrimitives>): ScheduleStartDateUpdatedDomainEvent {
		return new ScheduleStartDateUpdatedDomainEvent(
			ScheduleIdMother.create(params?.id).value,
			params?.startDate ?? ScheduleStartDateMother.create().value.toISOString()
		);
	}
}
