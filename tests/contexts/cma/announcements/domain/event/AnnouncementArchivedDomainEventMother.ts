import { Announcement } from "../../../../../../src/contexts/cma/announcements/domain/Announcement";
import { AnnouncementArchivedDomainEvent } from "../../../../../../src/contexts/cma/announcements/domain/event/AnnouncementArchivedDomainEvent";
import { AnnouncementMother } from "../AnnouncementMother";

export class AnnouncementArchivedDomainEventMother {
	static create(announcement?: Announcement): AnnouncementArchivedDomainEvent {
		const anouncementPrimitives = (announcement ?? AnnouncementMother.create()).toPrimitives();

		return new AnnouncementArchivedDomainEvent(
			anouncementPrimitives.id
		);
	}
}
