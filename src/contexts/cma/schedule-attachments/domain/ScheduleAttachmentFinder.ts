import { ScheduleAttachment } from "./ScheduleAttachment";
import { ScheduleAttachmentDoesNotExist } from "./ScheduleAttachmentDoesNotExist";
import { ScheduleAttachmentId } from "./ScheduleAttachmentId";
import { ScheduleAttachmentRepository } from "./ScheduleAttachmentRepository";

export class ScheduleAttachmentFinder {
	constructor(private readonly repository: ScheduleAttachmentRepository) {}

	async find(id: string): Promise<ScheduleAttachment> {
		const attachment = await this.repository.search(new ScheduleAttachmentId(id));
		if (!attachment) {
			throw new ScheduleAttachmentDoesNotExist(id);
		}

		return attachment;
	}
}
