import { faker } from "@faker-js/faker";

import { EventName } from "../../../../../src/contexts/cma/events/domain/EventName";

export class EventNameMother {
	static create(value?: string): EventName {
		return new EventName(value ?? faker.lorem.sentence());
	}
}
