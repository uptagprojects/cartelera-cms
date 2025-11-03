import { AnnouncementPrimitives } from "../../../../../../src/contexts/cma/announcements/domain/Announcement";
import { AnnouncementContentUpdatedDomainEvent } from "../../../../../../src/contexts/cma/announcements/domain/events/AnnouncementContentUpdatedDomainEvent";
import { AnnouncementContentMother } from "../AnnouncementContentMother";
import { AnnouncementIdMother } from "../AnnouncementIdMother";

export class AnnouncementContentUpdatedDomainEventMother {
	static create(params?: Partial<AnnouncementPrimitives>): AnnouncementContentUpdatedDomainEvent {
		return new AnnouncementContentUpdatedDomainEvent(
			AnnouncementIdMother.create(params?.id).value,
			AnnouncementContentMother.create(params?.content).value
		);
	}
}
