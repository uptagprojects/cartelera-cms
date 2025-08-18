import { faker } from "@faker-js/faker";

import { AnnouncementStatus } from "../../../../../src/contexts/cma/announcements/domain/AnnouncementStatus";

export class AnnouncementStatusMother {
	static create(value?: AnnouncementStatus): AnnouncementStatus {
		return value ?? faker.helpers.enumValue(AnnouncementStatus);
	}
}
