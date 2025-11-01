import { faker } from "@faker-js/faker";

import { ActivityId } from "../../../../../src/contexts/cda/activities/domain/ActivityId";

export class ActivityIdMother {
	static create(value?: string): ActivityId {
		return new ActivityId(value ?? faker.string.uuid());
	}
}
