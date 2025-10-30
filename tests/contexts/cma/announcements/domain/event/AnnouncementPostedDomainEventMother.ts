import { AnnouncementPostedDomainEvent } from "../../../../../../src/contexts/cma/announcements/domain/event/AnnouncementPostedDomainEvent";
import { AnnouncementPrimitives } from "../../../../../../src/contexts/cma/announcements/domain/Announcement";
import { AnnouncementStatus } from "../../../../../../src/contexts/cma/announcements/domain/AnnouncementStatus";
import { AnnouncementContentMother } from "../AnnouncementContentMother";
import { AnnouncementIdMother } from "../AnnouncementIdMother";
import { AnnouncementPublishDateMother } from "../AnnouncementPublishDateMother";
import { AnnouncementTitleMother } from "../AnnouncementTitleMother";
import { AnnouncementTypeMother } from "../AnnouncementTypeMother";

export class AnnouncementPostedDomainEventMother {
	static create(params?: Partial<AnnouncementPrimitives>): AnnouncementPostedDomainEvent {
		const primitives: AnnouncementPrimitives = {
			id: AnnouncementIdMother.create().value,
			title: AnnouncementTitleMother.create().value,
			content: AnnouncementContentMother.create().value,
			publishDate: AnnouncementPublishDateMother.create().value.toISOString(),
			type: AnnouncementTypeMother.create(),
			status: AnnouncementStatus.DRAFT,
			...params
		};

		return new AnnouncementPostedDomainEvent(
			primitives.id,
			primitives.title,
			primitives.content,
			primitives.publishDate,
			primitives.type
		);
	}
}
