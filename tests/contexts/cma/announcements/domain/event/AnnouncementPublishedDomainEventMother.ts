import { faker } from "@faker-js/faker";

import { AnnouncementPublishedDomainEvent } from "../../../../../../src/contexts/cma/announcements/domain/event/AnnouncementPublishedDomainEvent";

interface AnnouncementPublishedParams {
	id?: string;
	title?: string;
	content?: string;
	publishDate?: string;
	type?: string;
}

export class AnnouncementPublishedDomainEventMother {
	static create(params?: AnnouncementPublishedParams): AnnouncementPublishedDomainEvent {
		return new AnnouncementPublishedDomainEvent(
			params?.id ?? faker.string.uuid(),
			params?.title ?? faker.lorem.sentence(),
			params?.content ?? faker.lorem.paragraph(),
			params?.publishDate ?? faker.date.recent().toISOString(),
			params?.type ?? faker.helpers.arrayElement(["info", "warning", "urgent"])
		);
	}
}
