import { faker } from "@faker-js/faker";

import { EventStartDate } from "../../../../../src/contexts/cma/events/domain/EventStartDate";

export class EventStartDateMother {
	static create(value?: Date): EventStartDate {
		const date = value ?? faker.date.future();
		date.setHours(0, 0, 0, 0);

		return new EventStartDate(date.toISOString());
	}
}
