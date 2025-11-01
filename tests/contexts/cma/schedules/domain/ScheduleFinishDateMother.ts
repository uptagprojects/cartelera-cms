import { faker } from "@faker-js/faker";

import { ScheduleFinishDate } from "../../../../../src/contexts/cma/schedules/domain/ScheduleFinishDate";

export class ScheduleFinishDateMother {
	static create(value?: Date): ScheduleFinishDate {
		const date = value ?? faker.date.future();
		date.setHours(0, 0, 0, 0);

		return new ScheduleFinishDate(date.toISOString());
	}
}
