import { faker } from "@faker-js/faker";

import { ScheduleAttachmentName } from "../../../../../src/contexts/cma/schedule-attachments/domain/ScheduleAttachmentName";

export class ScheduleAttachmentNameMother {
	static create(value?: string): ScheduleAttachmentName {
		return new ScheduleAttachmentName(value ?? faker.system.fileName());
	}
}
