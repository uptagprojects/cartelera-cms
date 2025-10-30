import { faker } from "@faker-js/faker";

import { AnnouncementPublishDate } from "../../../../../src/contexts/cma/announcements/domain/AnnouncementPublishDate";

export class AnnouncementPublishDateMother {
	static create(value?: Date): AnnouncementPublishDate {
		return new AnnouncementPublishDate(value ?? faker.date.recent());
	}
}
