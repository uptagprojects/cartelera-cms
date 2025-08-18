import { Announcement, AnnouncementPrimitives } from "../../../../../../src/contexts/cma/announcements/domain/Announcement";
import { AnnouncementArchivedDomainEvent } from "../../../../../../src/contexts/cma/announcements/domain/event/AnnouncementArchivedDomainEvent";
import { AnnouncementMother } from "../AnnouncementMother";

export class AnnouncementArchivedDomainEventMother {
	static create(params?: Partial<AnnouncementPrimitives>): AnnouncementArchivedDomainEvent {
		const primitives = AnnouncementMother.create(params).toPrimitives();
		return new AnnouncementArchivedDomainEvent(
			primitives.id
		);
	}
}
