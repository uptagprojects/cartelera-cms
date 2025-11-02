import { faker } from "@faker-js/faker";

import { ScheduleAttachmentStoragePath } from "../../../../../src/contexts/cma/schedule-attachments/domain/ScheduleAttachmentStoragePath";

export class ScheduleAttachmentStoragePathMother {
	static create(value?: string): ScheduleAttachmentStoragePath {
		return new ScheduleAttachmentStoragePath(
			value ?? `/schedule-attachments/${faker.string.uuid()}.pdf`
		);
	}
}
