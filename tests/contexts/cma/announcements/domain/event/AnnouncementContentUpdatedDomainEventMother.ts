import { Announcement } from "../../../../../../src/contexts/cma/announcements/domain/Announcement";
import { AnnouncementContentUpdatedDomainEvent } from "../../../../../../src/contexts/cma/announcements/domain/event/AnnouncementContentUpdatedDomainEvent";
import { AnnouncementMother } from "../AnnouncementMother";

export class AnnouncementContentUpdatedDomainEventMother {
	static create(announcement?: Announcement): AnnouncementContentUpdatedDomainEvent {
		const anouncementPrimitives = (announcement ?? AnnouncementMother.create()).toPrimitives();

		return new AnnouncementContentUpdatedDomainEvent(
			anouncementPrimitives.id,
			anouncementPrimitives.content
		);
	}
}
