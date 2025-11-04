import { AnnouncementPublishedDomainEvent } from "../../../../../../src/contexts/cma/announcements/domain/events/AnnouncementPublishedDomainEvent";
import { CdaAnnouncementIdMother } from "../CdaAnnouncementIdMother";
import { CdaAnnouncementTitleMother } from "../CdaAnnouncementTitleMother";
import { CdaAnnouncementContentMother } from "../CdaAnnouncementContentMother";
import { CdaAnnouncementTypeMother } from "../CdaAnnouncementTypeMother";

export class AnnouncementPublishedDomainEventMother {
	static create(params?: {
		id?: string;
		title?: string;
		content?: string;
		publishDate?: string;
		type?: string;
	}): AnnouncementPublishedDomainEvent {
		return new AnnouncementPublishedDomainEvent(
			params?.id ?? CdaAnnouncementIdMother.create().value,
			params?.title ?? CdaAnnouncementTitleMother.create().value,
			params?.content ?? CdaAnnouncementContentMother.create().value,
			params?.publishDate ?? new Date().toISOString(),
			params?.type ?? CdaAnnouncementTypeMother.create()
		);
	}
}
