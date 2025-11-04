import { faker } from "@faker-js/faker";

import { ScheduleEndDate } from "../../../../../src/contexts/cda/schedule/domain/ScheduleEndDate";

export class ScheduleEndDateMother {
	static create(value?: Date): ScheduleEndDate {
		const date = value ?? faker.date.future();
		date.setHours(0, 0, 0, 0);

		return new ScheduleEndDate(date.toISOString());
	}
}
