import { Announcement, AnnouncementPrimitives } from "../../../../../src/contexts/cma/announcements/domain/Announcement";
import { AnnouncementStatus } from "../../../../../src/contexts/cma/announcements/domain/AnnouncementStatus";
import { AnnouncementContentMother } from "./AnnouncementContentMother";
import { AnnouncementIdMother } from "./AnnouncementIdMother";
import { AnnouncementPublishDateMother } from "./AnnouncementPublishDateMother";
import { AnnouncementTitleMother } from "./AnnouncementTitleMother";
import { AnnouncementTypeMother } from "./AnnouncementTypeMother";

export class AnnouncementMother {
	static create(params?: Partial<AnnouncementPrimitives>): Announcement {
		const primitives: AnnouncementPrimitives = {
			id: AnnouncementIdMother.create().value,
			title: AnnouncementTitleMother.create().value,
			content: AnnouncementContentMother.create().value,
			publishDate: AnnouncementPublishDateMother.create().value.toISOString(),
			type: AnnouncementTypeMother.create(),
			status: AnnouncementStatus.DRAFT,
			...params
		};

		return Announcement.fromPrimitives(primitives);
	}
}
