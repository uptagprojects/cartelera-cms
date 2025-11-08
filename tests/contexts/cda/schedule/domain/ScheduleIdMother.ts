import { faker } from "@faker-js/faker";

import { ScheduleId } from "../../../../../src/contexts/cda/schedule/domain/ScheduleId";

export class ScheduleIdMother {
	static create(value?: string): ScheduleId {
		return new ScheduleId(value ?? faker.string.uuid());
	}
}
