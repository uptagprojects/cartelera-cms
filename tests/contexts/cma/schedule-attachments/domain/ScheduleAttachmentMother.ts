import {
	ScheduleAttachment,
	ScheduleAttachmentPrimitives
} from "../../../../../src/contexts/cma/schedule-attachments/domain/ScheduleAttachment";
import { ScheduleIdMother } from "../../schedules/domain/ScheduleIdMother";
import { ScheduleAttachmentIdMother } from "./ScheduleAttachmentIdMother";
import { ScheduleAttachmentMIMETypeMother } from "./ScheduleAttachmentMIMETypeMother";
import { ScheduleAttachmentNameMother } from "./ScheduleAttachmentNameMother";
import { ScheduleAttachmentSizeMother } from "./ScheduleAttachmentSizeMother";
import { ScheduleAttachmentStoragePathMother } from "./ScheduleAttachmentStoragePathMother";
import { ScheduleAttachmentURLMother } from "./ScheduleAttachmentURLMother";

export class ScheduleAttachmentMother {
	static create(params?: Partial<ScheduleAttachmentPrimitives>): ScheduleAttachment {
		const primitives: ScheduleAttachmentPrimitives = {
			id: ScheduleAttachmentIdMother.create().value,
			name: ScheduleAttachmentNameMother.create().value,
			scheduleId: ScheduleIdMother.create().value,
			url: ScheduleAttachmentURLMother.create().value.toString(),
			size: ScheduleAttachmentSizeMother.create().value,
			mimeType: ScheduleAttachmentMIMETypeMother.create().value,
			storagePath: ScheduleAttachmentStoragePathMother.create().value,
			...params
		};

		return ScheduleAttachment.fromPrimitives(primitives);
	}
}
