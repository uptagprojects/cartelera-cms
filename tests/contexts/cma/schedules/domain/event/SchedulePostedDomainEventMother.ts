import { SchedulePostedDomainEvent } from "../../../../../../src/contexts/cma/schedules/domain/events/ScheduledPostedDomainEvent";
import { SchedulePrimitives } from "../../../../../../src/contexts/cma/schedules/domain/Schedule";
import { ScheduleStatus } from "../../../../../../src/contexts/cma/schedules/domain/ScheduleStatus";
import { ScheduleFinishDateMother } from "../ScheduleFinishDateMother";
import { ScheduleIdMother } from "../ScheduleIdMother";
import { ScheduleNameMother } from "../ScheduleNameMother";
import { ScheduleStartDateMother } from "../ScheduleStartDateMother";

export class SchedulePostedDomainEventMother {
	static create(params?: Partial<SchedulePrimitives>): SchedulePostedDomainEvent {
		const primitives: SchedulePrimitives = {
			id: ScheduleIdMother.create().value,
			name: ScheduleNameMother.create().value,
			startDate: ScheduleStartDateMother.create().value.toISOString(),
			finishDate: ScheduleFinishDateMother.create().value.toISOString(),
			status: ScheduleStatus.DRAFT,
			...params
		};

		return new SchedulePostedDomainEvent(
			primitives.id,
			primitives.name,
			primitives.startDate,
			primitives.finishDate,
			primitives.status
		);
	}
}
