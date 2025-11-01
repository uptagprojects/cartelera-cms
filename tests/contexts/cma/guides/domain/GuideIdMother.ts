import { faker } from "@faker-js/faker";

import { GuideId } from "../../../../../src/contexts/cma/guides/domain/GuideId";

export class GuideIdMother {
	static create(value?: string): GuideId {
		return new GuideId(value ?? faker.string.uuid());
	}
}
