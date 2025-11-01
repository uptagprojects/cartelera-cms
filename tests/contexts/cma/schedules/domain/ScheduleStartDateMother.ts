import { faker } from "@faker-js/faker";

import { ScheduleStartDate } from "../../../../../src/contexts/cma/schedules/domain/ScheduleStartDate";

export class ScheduleStartDateMother {
	static create(value?: Date): ScheduleStartDate {
		const date = value ?? faker.date.future();
		date.setHours(0, 0, 0, 0);

		return new ScheduleStartDate(date.toISOString());
	}
}
