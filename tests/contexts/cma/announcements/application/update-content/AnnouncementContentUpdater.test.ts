import { AnnouncementContentUpdater } from "../../../../../../src/contexts/cma/announcements/application/update-content/AnnouncementContentUpdater";
import { AnnouncementIsArchivedError } from "../../../../../../src/contexts/cma/announcements/domain/AnnouncementIsArchivedError";
import { AnnouncementStatus } from "../../../../../../src/contexts/cma/announcements/domain/AnnouncementStatus";
import { AnnouncementContentUpdatedDomainEvent } from "../../../../../../src/contexts/cma/announcements/domain/event/AnnouncementContentUpdatedDomainEvent";
import { MockEventBus } from "../../../../shared/infrastructure/MockEventBus";
import { AnnouncementMother } from "../../domain/AnnouncementMother";
import { MockAnnouncementRepository } from "../../infrastructure/MockAnnouncementRepository";
import { AnnouncementContentMother } from "../../domain/AnnouncementContentMother";

describe("AnnouncementContentUpdater should", () => {
	const repository = new MockAnnouncementRepository();
	const eventBus = new MockEventBus();
	const updater = new AnnouncementContentUpdater(repository, eventBus);

	it("update a valid announcement content", async () => {
		const expectedAnnouncement = AnnouncementMother.create(undefined, undefined, undefined, undefined, undefined, AnnouncementStatus.DRAFT);
		repository.shouldSearch(expectedAnnouncement);
		repository.shouldSave();
		const newContent = AnnouncementContentMother.create();

		await updater.update(expectedAnnouncement.toPrimitives().id, newContent.value);

		const savedAnnouncement = repository.getSavedAnnouncement();
		expect(savedAnnouncement?.toPrimitives().content).toBe(newContent.value);
		eventBus.assertLastPublishedEventIs(AnnouncementContentUpdatedDomainEvent);
	});

	it("throw an error when announcement is archived", async () => {
		const expectedAnnouncement = AnnouncementMother.create(undefined, undefined, undefined, undefined, undefined, AnnouncementStatus.ARCHIVED);
		repository.shouldSearch(expectedAnnouncement);
		const newContent = AnnouncementContentMother.create();

		await expect(updater.update(expectedAnnouncement.toPrimitives().id, newContent.value)).rejects.toThrow(AnnouncementIsArchivedError);
	});
});
