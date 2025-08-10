import { Announcement } from "../../../../../../src/contexts/cma/announcements/domain/Announcement";
import { AnnouncementRemovedDomainEvent } from "../../../../../../src/contexts/cma/announcements/domain/event/AnnouncementRemovedDomainEvent";
import { AnnouncementMother } from "../AnnouncementMother";

export class AnnouncementRemovedDomainEventMother {
	static create(announcement?: Announcement): AnnouncementRemovedDomainEvent {
		const anouncementPrimitives = (announcement ?? AnnouncementMother.create()).toPrimitives();

		return new AnnouncementRemovedDomainEvent(
			anouncementPrimitives.id
		);
	}
}
