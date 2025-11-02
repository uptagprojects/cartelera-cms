import { ScheduleAttachmentRemover } from "../../../../../../src/contexts/cma/schedule-attachments/application/remove/ScheduleAttachmentRemover";
import { MockEventBus } from "../../../../shared/infrastructure/MockEventBus";
import { MockFileStorage } from "../../../../shared/infrastructure/MockFileStorage";
import { ScheduleAttachmentMother } from "../../domain/ScheduleAttachmentMother";
import { MockScheduleAttachmentRepository } from "../../infrastructure/MockScheduleAttachmentRepository";

describe("ScheduleAttachmentRemover should", () => {
	const repository = new MockScheduleAttachmentRepository();
	const fileStorage = new MockFileStorage();
	const eventBus = new MockEventBus();
	const remover = new ScheduleAttachmentRemover(repository, fileStorage, eventBus);

	it("remove an existing schedule attachment", async () => {
		const attachment = ScheduleAttachmentMother.create();

		repository.shouldSearch(attachment);
		fileStorage.shouldRemove();
		repository.shouldRemove();
		eventBus.shouldPublish([]);

		await remover.remove(attachment.toPrimitives().id);
	});
});
