import { faker } from "@faker-js/faker";

import { GuideTitle } from "../../../../../src/contexts/cma/guides/domain/GuideTitle";

export class GuideTitleMother {
	static create(value?: string): GuideTitle {
		return new GuideTitle(value ?? faker.lorem.sentence());
	}
}
