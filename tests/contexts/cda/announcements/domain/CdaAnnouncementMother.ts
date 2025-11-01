import {
	CdaAnnouncement,
	CdaAnnouncementPrimitives
} from "../../../../../src/contexts/cda/announcements/domain/CdaAnnouncement";
import { CdaAnnouncementContentMother } from "./CdaAnnouncementContentMother";
import { CdaAnnouncementIdMother } from "./CdaAnnouncementIdMother";
import { CdaAnnouncementTitleMother } from "./CdaAnnouncementTitleMother";
import { CdaAnnouncementTypeMother } from "./CdaAnnouncementTypeMother";

export class CdaAnnouncementMother {
	static create(params?: Partial<CdaAnnouncementPrimitives>): CdaAnnouncement {
		const primitives: CdaAnnouncementPrimitives = {
			id: CdaAnnouncementIdMother.create().value,
			title: CdaAnnouncementTitleMother.create().value,
			content: CdaAnnouncementContentMother.create().value,
			type: CdaAnnouncementTypeMother.create(),
			...params
		};

		return CdaAnnouncement.fromPrimitives(primitives);
	}
}
