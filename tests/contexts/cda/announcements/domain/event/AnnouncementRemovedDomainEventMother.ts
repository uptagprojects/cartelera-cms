import { AnnouncementRemovedDomainEvent } from "../../../../../../src/contexts/cma/announcements/domain/event/AnnouncementRemovedDomainEvent";
import { CdaAnnouncementIdMother } from "../CdaAnnouncementIdMother";

export class AnnouncementRemovedDomainEventMother {
	static create(params?: { id?: string }): AnnouncementRemovedDomainEvent {
		return new AnnouncementRemovedDomainEvent(
			params?.id ?? CdaAnnouncementIdMother.create().value
		);
	}
}
