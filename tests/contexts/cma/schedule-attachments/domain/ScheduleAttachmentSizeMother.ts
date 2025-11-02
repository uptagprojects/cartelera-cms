import { faker } from "@faker-js/faker";

import { ScheduleAttachmentSize } from "../../../../../src/contexts/cma/schedule-attachments/domain/ScheduleAttachmentSize";

export class ScheduleAttachmentSizeMother {
	static create(value?: number): ScheduleAttachmentSize {
		return new ScheduleAttachmentSize(value ?? faker.number.int({ min: 1000, max: 5000000 }));
	}
}
