import { Announcement, AnnouncementPrimitives } from "../../../../../../src/contexts/cma/announcements/domain/Announcement";
import { AnnouncementPostedDomainEvent } from "../../../../../../src/contexts/cma/announcements/domain/event/AnnouncementPostedDomainEvent";
import { AnnouncementMother } from "../AnnouncementMother";

export class AnnouncementPostedDomainEventMother {
	static create(params?: Partial<AnnouncementPrimitives>): AnnouncementPostedDomainEvent {
		const primitives = AnnouncementMother.create(params).toPrimitives();

		return new AnnouncementPostedDomainEvent(
			primitives.id,
			primitives.title,
			primitives.content,
			primitives.publishDate,
			primitives.type
		);
	}
}
