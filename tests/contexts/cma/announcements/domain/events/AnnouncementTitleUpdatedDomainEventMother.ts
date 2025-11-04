import { AnnouncementPrimitives } from "../../../../../../src/contexts/cma/announcements/domain/Announcement";
import { AnnouncementTitleUpdatedDomainEvent } from "../../../../../../src/contexts/cma/announcements/domain/events/AnnouncementTitleUpdatedDomainEvent";
import { AnnouncementIdMother } from "../AnnouncementIdMother";
import { AnnouncementTitleMother } from "../AnnouncementTitleMother";

export class AnnouncementTitleUpdatedDomainEventMother {
	static create(params?: Partial<AnnouncementPrimitives>): AnnouncementTitleUpdatedDomainEvent {
		return new AnnouncementTitleUpdatedDomainEvent(
			AnnouncementIdMother.create(params?.id).value,
			AnnouncementTitleMother.create(params?.title).value
		);
	}
}
