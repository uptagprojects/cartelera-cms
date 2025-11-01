import { AnnouncementArchivedDomainEvent } from "../../../../../../src/contexts/cma/announcements/domain/event/AnnouncementArchivedDomainEvent";
import { CdaAnnouncementIdMother } from "../CdaAnnouncementIdMother";

export class AnnouncementArchivedDomainEventMother {
	static create(params?: { id?: string }): AnnouncementArchivedDomainEvent {
		return new AnnouncementArchivedDomainEvent(
			params?.id ?? CdaAnnouncementIdMother.create().value
		);
	}
}
