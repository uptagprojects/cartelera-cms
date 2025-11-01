import { faker } from "@faker-js/faker";

import { EventLocation } from "../../../../../src/contexts/cma/events/domain/EventLocation";

export class EventLocationMother {
	static create(value?: string): EventLocation {
		return new EventLocation(value ?? faker.location.city());
	}
}
