import { ScheduleAttachmentUploader } from "../../../../../../src/contexts/cma/schedule-attachments/application/upload/ScheduleAttachmentUploader";
import { MockEventBus } from "../../../../shared/infrastructure/MockEventBus";
import { MockFileStorage } from "../../../../shared/infrastructure/MockFileStorage";
import { ScheduleIdMother } from "../../../schedules/domain/ScheduleIdMother";
import { ScheduleAttachmentUploadedDomainEventMother } from "../../domain/events/ScheduleAttachmentUploadedDomainEventMother";
import { ScheduleAttachmentIdMother } from "../../domain/ScheduleAttachmentIdMother";
import { ScheduleAttachmentURLMother } from "../../domain/ScheduleAttachmentURLMother";
import { MockScheduleAttachmentRepository } from "../../infrastructure/MockScheduleAttachmentRepository";

describe("ScheduleAttachmentUploader should", () => {
	const repository = new MockScheduleAttachmentRepository();
	const fileStorage = new MockFileStorage();
	const eventBus = new MockEventBus();
	const uploader = new ScheduleAttachmentUploader(repository, fileStorage, eventBus);

	it("upload a new schedule attachment", async () => {
		const id = ScheduleAttachmentIdMother.create();
		const scheduleId = ScheduleIdMother.create();
		const url = ScheduleAttachmentURLMother.create();
		const file = new File(["test content"], "test.pdf", { type: "application/pdf" });

		const expectedEvent = ScheduleAttachmentUploadedDomainEventMother.create({
			id: id.value,
			name: file.name,
			scheduleId: scheduleId.value,
			url: url.value.toString(),
			size: file.size,
			mimeType: file.type,
			storagePath: `/schedule-attachments/${id.value}.pdf`
		});

		fileStorage.shouldSave(url.value.toString());
		repository.shouldSave();
		eventBus.shouldPublish([expectedEvent]);

		await uploader.upload(id.value, scheduleId.value, file);
	});
});
