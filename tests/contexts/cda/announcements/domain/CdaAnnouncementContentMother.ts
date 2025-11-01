import { faker } from "@faker-js/faker";

import { CdaAnnouncementContent } from "../../../../../src/contexts/cda/announcements/domain/CdaAnnouncementContent";

export class CdaAnnouncementContentMother {
	static create(value?: string): CdaAnnouncementContent {
		return new CdaAnnouncementContent(value ?? faker.lorem.paragraph(1));
	}
}
