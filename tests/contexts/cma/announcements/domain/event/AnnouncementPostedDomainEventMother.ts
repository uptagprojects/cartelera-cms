import { Announcement } from "../../../../../../src/contexts/cma/announcements/domain/Announcement";
import { AnnouncementPostedDomainEvent } from "../../../../../../src/contexts/cma/announcements/domain/event/AnnouncementPostedDomainEvent";
import { AnnouncementMother } from "../AnnouncementMother";

export class AnnouncementPostedDomainEventMother {
	static create(announcement?: Announcement): AnnouncementPostedDomainEvent {
		const anouncementPrimitives = (announcement ?? AnnouncementMother.create()).toPrimitives();

		return new AnnouncementPostedDomainEvent(
			anouncementPrimitives.id,
			anouncementPrimitives.title,
			anouncementPrimitives.content,
			anouncementPrimitives.publishDate,
			anouncementPrimitives.type
		);
	}
}
