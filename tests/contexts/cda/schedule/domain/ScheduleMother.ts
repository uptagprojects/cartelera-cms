import {
	Schedule,
	SchedulePrimitives
} from "../../../../../src/contexts/cda/schedule/domain/Schedule";
import { ScheduleEndDateMother } from "./ScheduleEndDateMother";
import { ScheduleIdMother } from "./ScheduleIdMother";
import { ScheduleStartDateMother } from "./ScheduleStartDateMother";

export class ScheduleMother {
	static create(params?: Partial<SchedulePrimitives>): Schedule {
		const primitives: SchedulePrimitives = {
			id: ScheduleIdMother.create().value,
			startDate: ScheduleStartDateMother.create().value.toISOString(),
			endDate: ScheduleEndDateMother.create().value.toISOString(),
			...params
		};

		return Schedule.fromPrimitives(primitives);
	}
}
