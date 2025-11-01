import { Schedule, SchedulePrimitives } from "../../../../../src/contexts/cma/schedules/domain/Schedule";
import { ScheduleStatus } from "../../../../../src/contexts/cma/schedules/domain/ScheduleStatus";
import { ScheduleFinishDateMother } from "./ScheduleFinishDateMother";
import { ScheduleIdMother } from "./ScheduleIdMother";
import { ScheduleNameMother } from "./ScheduleNameMother";
import { ScheduleStartDateMother } from "./ScheduleStartDateMother";

export class ScheduleMother {
	static create(params?: Partial<SchedulePrimitives>): Schedule {
		const primitives: SchedulePrimitives = {
			id: ScheduleIdMother.create().value,
			name: ScheduleNameMother.create().value,
			startDate: ScheduleStartDateMother.create().value.toISOString(),
			finishDate: ScheduleFinishDateMother.create().value.toISOString(),
			status: ScheduleStatus.DRAFT,
			...params
		};

		return Schedule.fromPrimitives(primitives);
	}
}
