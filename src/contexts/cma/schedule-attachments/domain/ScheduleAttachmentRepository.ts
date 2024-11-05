import { ScheduleId } from "../../schedules/domain/ScheduleId";
import { ScheduleAttachment } from "./ScheduleAttachment";
import { ScheduleAttachmentId } from "./ScheduleAttachmentId";

export interface ScheduleAttachmentRepository {
	save(scheduleAttachment: ScheduleAttachment): Promise<void>;

	search(id: ScheduleAttachmentId): Promise<ScheduleAttachment | null>;

	searchAllByScheduleId(scheduleId: ScheduleId): Promise<ScheduleAttachment[]>;

	remove(scheduleAttachment: ScheduleAttachment): Promise<void>;
}
