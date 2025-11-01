import { faker } from "@faker-js/faker";

import { CdaAnnouncementTitle } from "../../../../../src/contexts/cda/announcements/domain/CdaAnnouncementTitle";

export class CdaAnnouncementTitleMother {
	static create(value?: string): CdaAnnouncementTitle {
		return new CdaAnnouncementTitle(value ?? faker.lorem.sentence());
	}
}
