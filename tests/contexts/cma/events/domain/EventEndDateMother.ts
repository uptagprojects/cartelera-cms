import { faker } from "@faker-js/faker";

import { EventEndDate } from "../../../../../src/contexts/cma/events/domain/EventEndDate";

export class EventEndDateMother {
	static create(value?: Date): EventEndDate {
		const date = value ?? faker.date.future();
		date.setHours(0, 0, 0, 0);

		return new EventEndDate(date.toISOString());
	}
}
