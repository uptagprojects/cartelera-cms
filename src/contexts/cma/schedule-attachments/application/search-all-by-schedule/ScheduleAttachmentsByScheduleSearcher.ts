import { ScheduleId } from "../../../schedules/domain/ScheduleId";
import { ScheduleAttachment } from "../../domain/ScheduleAttachment";
import { ScheduleAttachmentRepository } from "../../domain/ScheduleAttachmentRepository";

export class ScheduleAttachmentsByScheduleSearcher {
	constructor(private readonly repository: ScheduleAttachmentRepository) {}

	async search(scheduleId: string): Promise<ScheduleAttachment[]> {
		return this.repository.searchAllByScheduleId(new ScheduleId(scheduleId));
	}
}
