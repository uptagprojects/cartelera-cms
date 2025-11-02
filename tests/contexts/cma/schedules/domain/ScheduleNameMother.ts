import { faker } from "@faker-js/faker";

import { ScheduleName } from "../../../../../src/contexts/cma/schedules/domain/ScheduleName";

export class ScheduleNameMother {
	static create(value?: string): ScheduleName {
		return new ScheduleName(value ?? faker.lorem.words(3));
	}
}
