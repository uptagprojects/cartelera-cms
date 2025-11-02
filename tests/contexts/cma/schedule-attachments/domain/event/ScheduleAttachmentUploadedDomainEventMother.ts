import { ScheduleAttachmentUploadedDomainEvent } from "../../../../../../src/contexts/cma/schedule-attachments/domain/event/ScheduleAttachmentUploadedDomainEvent";
import { ScheduleIdMother } from "../../../schedules/domain/ScheduleIdMother";
import { ScheduleAttachmentIdMother } from "../ScheduleAttachmentIdMother";
import { ScheduleAttachmentMIMETypeMother } from "../ScheduleAttachmentMIMETypeMother";
import { ScheduleAttachmentNameMother } from "../ScheduleAttachmentNameMother";
import { ScheduleAttachmentSizeMother } from "../ScheduleAttachmentSizeMother";
import { ScheduleAttachmentStoragePathMother } from "../ScheduleAttachmentStoragePathMother";
import { ScheduleAttachmentURLMother } from "../ScheduleAttachmentURLMother";

export class ScheduleAttachmentUploadedDomainEventMother {
	static create(params?: {
		id?: string;
		name?: string;
		scheduleId?: string;
		url?: string;
		size?: number;
		mimeType?: string;
		storagePath?: string;
	}): ScheduleAttachmentUploadedDomainEvent {
		return new ScheduleAttachmentUploadedDomainEvent(
			params?.id ?? ScheduleAttachmentIdMother.create().value,
			params?.name ?? ScheduleAttachmentNameMother.create().value,
			params?.scheduleId ?? ScheduleIdMother.create().value,
			params?.url ?? ScheduleAttachmentURLMother.create().value.toString(),
			params?.size ?? ScheduleAttachmentSizeMother.create().value,
			params?.mimeType ?? ScheduleAttachmentMIMETypeMother.create().value,
			params?.storagePath ?? ScheduleAttachmentStoragePathMother.create().value
		);
	}
}
