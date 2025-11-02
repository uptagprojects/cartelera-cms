import { faker } from "@faker-js/faker";

import { ScheduleAttachmentURL } from "../../../../../src/contexts/cma/schedule-attachments/domain/ScheduleAttachmentURL";

export class ScheduleAttachmentURLMother {
	static create(value?: string): ScheduleAttachmentURL {
		return new ScheduleAttachmentURL(value ?? faker.internet.url());
	}
}
