import { faker } from "@faker-js/faker";

import { EventName } from "../../../../../src/contexts/cda/events/domain/EventName";

export class EventNameMother {
	static create(name?: string): EventName {
		return new EventName(name ?? faker.lorem.words(3));
	}
}
