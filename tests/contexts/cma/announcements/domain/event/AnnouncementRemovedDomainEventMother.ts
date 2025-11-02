import { AnnouncementPrimitives } from "../../../../../../src/contexts/cma/announcements/domain/Announcement";
import { AnnouncementRemovedDomainEvent } from "../../../../../../src/contexts/cma/announcements/domain/event/AnnouncementRemovedDomainEvent";
import { AnnouncementIdMother } from "../AnnouncementIdMother";

export class AnnouncementRemovedDomainEventMother {
	static create(params?: Partial<AnnouncementPrimitives>): AnnouncementRemovedDomainEvent {
		return new AnnouncementRemovedDomainEvent(AnnouncementIdMother.create(params?.id).value);
	}
}
