import { faker } from "@faker-js/faker";

import { AnnouncementContent } from "../../../../../src/contexts/cma/announcements/domain/AnnouncementContent";

export class AnnouncementContentMother {
	static create(value?: string): AnnouncementContent {
		return new AnnouncementContent(value ?? faker.lorem.paragraph({ min: 1, max: 3 }));
	}
}
