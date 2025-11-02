import { faker } from "@faker-js/faker";

import { GuideStatus } from "../../../../../src/contexts/cma/guides/domain/GuideStatus";

export class GuideStatusMother {
	static create(value?: GuideStatus): GuideStatus {
		return value ?? faker.helpers.enumValue(GuideStatus);
	}
}
