import { ScheduleFinishDateUpdatedDomainEvent } from "../../../../../../src/contexts/cma/schedules/domain/event/ScheduleFinishDateUpdatedDomainEvent";
import { SchedulePrimitives } from "../../../../../../src/contexts/cma/schedules/domain/Schedule";
import { ScheduleFinishDateMother } from "../ScheduleFinishDateMother";
import { ScheduleIdMother } from "../ScheduleIdMother";

export class ScheduleFinishDateUpdatedDomainEventMother {
	static create(params?: Partial<SchedulePrimitives>): ScheduleFinishDateUpdatedDomainEvent {
		return new ScheduleFinishDateUpdatedDomainEvent(
			ScheduleIdMother.create(params?.id).value,
			params?.finishDate ?? ScheduleFinishDateMother.create().value.toISOString()
		);
	}
}
