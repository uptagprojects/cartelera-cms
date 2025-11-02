import { ScheduleAttachment } from "../../../../../src/contexts/cma/schedule-attachments/domain/ScheduleAttachment";
import { ScheduleAttachmentId } from "../../../../../src/contexts/cma/schedule-attachments/domain/ScheduleAttachmentId";
import { ScheduleAttachmentRepository } from "../../../../../src/contexts/cma/schedule-attachments/domain/ScheduleAttachmentRepository";
import { ScheduleId } from "../../../../../src/contexts/cma/schedules/domain/ScheduleId";

export class MockScheduleAttachmentRepository implements ScheduleAttachmentRepository {
	private readonly mockSave = jest.fn();
	private readonly mockSearch = jest.fn();
	private readonly mockSearchAllByScheduleId = jest.fn();
	private readonly mockRemove = jest.fn();

	async save(_scheduleAttachment: ScheduleAttachment): Promise<void> {
		this.mockSave();
	}

	async search(_id: ScheduleAttachmentId): Promise<ScheduleAttachment | null> {
		return this.mockSearch() as Promise<ScheduleAttachment | null>;
	}

	async searchAllByScheduleId(_scheduleId: ScheduleId): Promise<ScheduleAttachment[]> {
		return this.mockSearchAllByScheduleId() as Promise<ScheduleAttachment[]>;
	}

	async remove(_scheduleAttachment: ScheduleAttachment): Promise<void> {
		this.mockRemove();
	}

	shouldSave(): void {
		this.mockSave.mockReturnValueOnce(undefined);
	}

	shouldSearch(attachment: ScheduleAttachment): void {
		this.mockSearch.mockReturnValueOnce(attachment);
	}

	shouldSearchAllByScheduleId(attachments: ScheduleAttachment[]): void {
		this.mockSearchAllByScheduleId.mockReturnValueOnce(attachments);
	}

	shouldRemove(): void {
		this.mockRemove.mockReturnValueOnce(undefined);
	}
}
