import { faker } from "@faker-js/faker";

import { AnnouncementTitle } from "../../../../../src/contexts/cma/announcements/domain/AnnouncementTitle";

export class AnnouncementTitleMother {
	static create(value?: string): AnnouncementTitle {
		return new AnnouncementTitle(value ?? faker.lorem.sentence({ min: 5, max: 10 }));
	}
}
