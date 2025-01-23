import { extname } from "path";

import { EventBus } from "../../../../shared/domain/event/EventBus";
import { FileStorage } from "../../../../shared/domain/shared-file-storage/SharedFileStorage";
import { ScheduleAttachment } from "../../domain/ScheduleAttachment";
import { ScheduleAttachmentRepository } from "../../domain/ScheduleAttachmentRepository";

export class ScheduleAttachmentUploader {
	constructor(
		private readonly repository: ScheduleAttachmentRepository,
		private readonly fileStorage: FileStorage,
		private readonly eventBus: EventBus
	) {}

	async upload(id: string, scheduleId: string, file: File): Promise<void> {
		const path = `/schedule-attachments/${id}${extname(file.name)}`;

		const url = await this.fileStorage.save(path, file);

		const attachment = ScheduleAttachment.create(
			id,
			file.name,
			scheduleId,
			url,
			file.size,
			file.type,
			path
		);

		await this.repository.save(attachment);
		await this.eventBus.publish(attachment.pullDomainEvents());
	}
}
