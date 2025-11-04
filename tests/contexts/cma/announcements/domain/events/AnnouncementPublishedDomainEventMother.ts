import { AnnouncementPrimitives } from "../../../../../../src/contexts/cma/announcements/domain/Announcement";
import { AnnouncementPublishedDomainEvent } from "../../../../../../src/contexts/cma/announcements/domain/events/AnnouncementPublishedDomainEvent";
import { AnnouncementContentMother } from "../AnnouncementContentMother";
import { AnnouncementIdMother } from "../AnnouncementIdMother";
import { AnnouncementPublishDateMother } from "../AnnouncementPublishDateMother";
import { AnnouncementTitleMother } from "../AnnouncementTitleMother";
import { AnnouncementTypeMother } from "../AnnouncementTypeMother";

export class AnnouncementPublishedDomainEventMother {
	static create(params?: Partial<AnnouncementPrimitives>): AnnouncementPublishedDomainEvent {
		return new AnnouncementPublishedDomainEvent(
			AnnouncementIdMother.create(params?.id).value,
			AnnouncementTitleMother.create(params?.title).value,
			AnnouncementContentMother.create(params?.content).value,
			params?.publishDate ?? AnnouncementPublishDateMother.create().value.toISOString(),
			params?.type ?? AnnouncementTypeMother.create()
		);
	}
}
