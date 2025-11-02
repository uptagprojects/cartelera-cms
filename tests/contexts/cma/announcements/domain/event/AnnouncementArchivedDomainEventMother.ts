import { AnnouncementPrimitives } from "../../../../../../src/contexts/cma/announcements/domain/Announcement";
import { AnnouncementArchivedDomainEvent } from "../../../../../../src/contexts/cma/announcements/domain/event/AnnouncementArchivedDomainEvent";
import { AnnouncementIdMother } from "../AnnouncementIdMother";

export class AnnouncementArchivedDomainEventMother {
	static create(params?: Partial<AnnouncementPrimitives>): AnnouncementArchivedDomainEvent {
		return new AnnouncementArchivedDomainEvent(AnnouncementIdMother.create(params?.id).value);
	}
}
