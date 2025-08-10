import { Announcement } from "../../../../../../src/contexts/cma/announcements/domain/Announcement";
import { AnnouncementRestoredDomainEvent } from "../../../../../../src/contexts/cma/announcements/domain/event/AnnouncementRestoredDomainEvent";
import { AnnouncementMother } from "../AnnouncementMother";

export class AnnouncementRestoredDomainEventMother {
	static create(announcement?: Announcement): AnnouncementRestoredDomainEvent {
		const anouncementPrimitives = (announcement ?? AnnouncementMother.create()).toPrimitives();

		return new AnnouncementRestoredDomainEvent(
			anouncementPrimitives.id
		);
	}
}
