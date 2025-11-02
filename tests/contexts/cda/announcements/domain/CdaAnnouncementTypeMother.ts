import { faker } from "@faker-js/faker";

import { CdaAnnouncementType } from "../../../../../src/contexts/cda/announcements/domain/CdaAnnouncementType";

export class CdaAnnouncementTypeMother {
	static create(value?: CdaAnnouncementType): CdaAnnouncementType {
		return (
			value ??
			faker.helpers.arrayElement([
				CdaAnnouncementType.INFO,
				CdaAnnouncementType.SUCCESS,
				CdaAnnouncementType.WARNING
			])
		);
	}
}
