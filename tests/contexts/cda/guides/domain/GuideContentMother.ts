import { faker } from "@faker-js/faker";

import { GuideContent } from "../../../../../src/contexts/cda/guides/domain/GuideContent";

export class GuideContentMother {
	static create(value?: string): GuideContent {
		return new GuideContent(value ?? faker.lorem.paragraph(1));
	}
}
