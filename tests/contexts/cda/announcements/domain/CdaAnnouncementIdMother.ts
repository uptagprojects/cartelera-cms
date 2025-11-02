import { faker } from "@faker-js/faker";

import { CdaAnnouncementId } from "../../../../../src/contexts/cda/announcements/domain/CdaAnnouncementId";

export class CdaAnnouncementIdMother {
	static create(value?: string): CdaAnnouncementId {
		return new CdaAnnouncementId(value ?? faker.string.uuid());
	}
}
