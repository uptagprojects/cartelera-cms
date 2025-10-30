import { faker } from "@faker-js/faker";

import { AnnouncementId } from "../../../../../src/contexts/cma/announcements/domain/AnnouncementId";

export class AnnouncementIdMother {
	static create(value?: string): AnnouncementId {
		return new AnnouncementId(value ?? faker.string.uuid());
	}
}
