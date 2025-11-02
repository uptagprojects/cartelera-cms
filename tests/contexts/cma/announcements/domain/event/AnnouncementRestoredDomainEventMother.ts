import { AnnouncementPrimitives } from "../../../../../../src/contexts/cma/announcements/domain/Announcement";
import { AnnouncementRestoredDomainEvent } from "../../../../../../src/contexts/cma/announcements/domain/event/AnnouncementRestoredDomainEvent";
import { AnnouncementIdMother } from "../AnnouncementIdMother";

export class AnnouncementRestoredDomainEventMother {
	static create(params?: Partial<AnnouncementPrimitives>): AnnouncementRestoredDomainEvent {
		return new AnnouncementRestoredDomainEvent(AnnouncementIdMother.create(params?.id).value);
	}
}
