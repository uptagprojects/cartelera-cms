import { faker } from "@faker-js/faker";

import { ScheduleAttachmentId } from "../../../../../src/contexts/cma/schedule-attachments/domain/ScheduleAttachmentId";

export class ScheduleAttachmentIdMother {
	static create(value?: string): ScheduleAttachmentId {
		return new ScheduleAttachmentId(value ?? faker.string.uuid());
	}
}
