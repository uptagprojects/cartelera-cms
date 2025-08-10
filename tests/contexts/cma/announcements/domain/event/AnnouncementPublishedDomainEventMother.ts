import { Announcement } from "../../../../../../src/contexts/cma/announcements/domain/Announcement";
import { AnnouncementPublishedDomainEvent } from "../../../../../../src/contexts/cma/announcements/domain/event/AnnouncementPublishedDomainEvent";
import { AnnouncementMother } from "../AnnouncementMother";

export class AnnouncementPublishedDomainEventMother {
	static create(announcement?: Announcement): AnnouncementPublishedDomainEvent {
		const anouncementPrimitives = (announcement ?? AnnouncementMother.create()).toPrimitives();

		return new AnnouncementPublishedDomainEvent(
			anouncementPrimitives.id,
			anouncementPrimitives.title,
			anouncementPrimitives.content,
			anouncementPrimitives.publishDate,
			anouncementPrimitives.type
		);
	}
}
