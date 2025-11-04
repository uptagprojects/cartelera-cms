import { faker } from "@faker-js/faker";

import { EventLocation } from "../../../../../src/contexts/cda/events/domain/EventLocation";

export class EventLocationMother {
	static create(location?: string): EventLocation {
		return new EventLocation(location ?? faker.location.city());
	}
}
