import { faker } from "@faker-js/faker";

import { EventId } from "../../../../../src/contexts/cma/events/domain/EventId";

export class EventIdMother {
	static create(value?: string): EventId {
		return new EventId(value ?? faker.string.uuid());
	}
}
