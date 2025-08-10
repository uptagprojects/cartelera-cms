import { Announcement } from "../../../../../../src/contexts/cma/announcements/domain/Announcement";
import { AnnouncementTitleUpdatedDomainEvent } from "../../../../../../src/contexts/cma/announcements/domain/event/AnnouncementTitleUpdatedDomainEvent";
import { AnnouncementMother } from "../AnnouncementMother";

export class AnnouncementTitleUpdatedDomainEventMother {
	static create(announcement?: Announcement): AnnouncementTitleUpdatedDomainEvent {
		const anouncementPrimitives = (announcement ?? AnnouncementMother.create()).toPrimitives();

		return new AnnouncementTitleUpdatedDomainEvent(
			anouncementPrimitives.id,
			anouncementPrimitives.title
		);
	}
}
