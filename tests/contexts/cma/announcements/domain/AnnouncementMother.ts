import { Announcement } from "../../../../../src/contexts/cma/announcements/domain/Announcement";
import { AnnouncementContent } from "../../../../../src/contexts/cma/announcements/domain/AnnouncementContent";
import { AnnouncementId } from "../../../../../src/contexts/cma/announcements/domain/AnnouncementId";
import { AnnouncementPublishDate } from "../../../../../src/contexts/cma/announcements/domain/AnnouncementPublishDate";
import { AnnouncementStatus } from "../../../../../src/contexts/cma/announcements/domain/AnnouncementStatus";
import { AnnouncementTitle } from "../../../../../src/contexts/cma/announcements/domain/AnnouncementTitle";
import { AnnouncementType } from "../../../../../src/contexts/cma/announcements/domain/AnnouncementType";
import { AnnouncementContentMother } from "./AnnouncementContentMother";
import { AnnouncementIdMother } from "./AnnouncementIdMother";
import { AnnouncementPublishDateMother } from "./AnnouncementPublishDateMother";
import { AnnouncementStatusMother } from "./AnnouncementStatusMother";
import { AnnouncementTitleMother } from "./AnnouncementTitleMother";
import { AnnouncementTypeMother } from "./AnnouncementTypeMother";

export class AnnouncementMother {
	static create(
		id?: AnnouncementId,
		title?: AnnouncementTitle,
		content?: AnnouncementContent,
		publishDate?: AnnouncementPublishDate,
		type?: AnnouncementType,
		status?: AnnouncementStatus
	): Announcement {
		return new Announcement(
			id ?? AnnouncementIdMother.create(),
			title ?? AnnouncementTitleMother.create(),
			content ?? AnnouncementContentMother.create(),
			publishDate ?? AnnouncementPublishDateMother.create(),
			type ?? AnnouncementTypeMother.create(),
			status ?? AnnouncementStatusMother.create()
		);
	}
}
