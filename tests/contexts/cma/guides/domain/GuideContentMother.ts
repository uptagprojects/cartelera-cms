import { faker } from "@faker-js/faker";

import { GuideContent } from "../../../../../src/contexts/cma/guides/domain/GuideContent";

export class GuideContentMother {
	static create(value?: string): GuideContent {
		return new GuideContent(value ?? faker.lorem.paragraph(1));
	}
}
