import { SchedulePrimitives } from "../../../../../../src/contexts/cma/schedules/domain/Schedule";
import { SchedulePublishedDomainEvent } from "../../../../../../src/contexts/cma/schedules/domain/events/SchedulePublishedDomainEvent";
import { ScheduleFinishDateMother } from "../ScheduleFinishDateMother";
import { ScheduleIdMother } from "../ScheduleIdMother";
import { ScheduleNameMother } from "../ScheduleNameMother";
import { ScheduleStartDateMother } from "../ScheduleStartDateMother";

export class SchedulePublishedDomainEventMother {
	static create(params?: Partial<SchedulePrimitives>): SchedulePublishedDomainEvent {
		const primitives: SchedulePrimitives = {
			id: ScheduleIdMother.create().value,
			name: ScheduleNameMother.create().value,
			startDate: ScheduleStartDateMother.create().value.toISOString(),
			finishDate: ScheduleFinishDateMother.create().value.toISOString(),
			status: params?.status ?? "PUBLISHED",
			...params
		};

		return new SchedulePublishedDomainEvent(
			primitives.id,
			primitives.name,
			primitives.startDate,
			primitives.finishDate
		);
	}
}
