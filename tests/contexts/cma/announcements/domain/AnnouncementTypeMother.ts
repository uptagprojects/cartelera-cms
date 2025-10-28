import { faker } from "@faker-js/faker";

import { AnnouncementType } from "../../../../../src/contexts/cma/announcements/domain/AnnouncementType";

export class AnnouncementTypeMother {
	static create(value?: AnnouncementType): AnnouncementType {
		return value ?? faker.helpers.arrayElement([
			AnnouncementType.INFO,
			AnnouncementType.SUCCESS,
			AnnouncementType.WARNING
		]);
	}
}
