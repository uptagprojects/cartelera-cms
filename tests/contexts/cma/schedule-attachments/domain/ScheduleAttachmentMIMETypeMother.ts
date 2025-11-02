import { faker } from "@faker-js/faker";

import { ScheduleAttachmentMIMEType } from "../../../../../src/contexts/cma/schedule-attachments/domain/ScheduleAttachmentMIMEType";

export class ScheduleAttachmentMIMETypeMother {
	static create(value?: string): ScheduleAttachmentMIMEType {
		return new ScheduleAttachmentMIMEType(value ?? faker.system.mimeType());
	}
}
