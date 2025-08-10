import { AnnouncementTitleUpdater } from "../../../../../../src/contexts/cma/announcements/application/update-title/AnnouncementTitleUpdater";
import { AnnouncementIsArchivedError } from "../../../../../../src/contexts/cma/announcements/domain/AnnouncementIsArchivedError";
import { AnnouncementStatus } from "../../../../../../src/contexts/cma/announcements/domain/AnnouncementStatus";
import { AnnouncementTitleUpdatedDomainEvent } from "../../../../../../src/contexts/cma/announcements/domain/event/AnnouncementTitleUpdatedDomainEvent";
import { MockEventBus } from "../../../../shared/infrastructure/MockEventBus";
import { AnnouncementMother } from "../../domain/AnnouncementMother";
import { MockAnnouncementRepository } from "../../infrastructure/MockAnnouncementRepository";
import { AnnouncementTitleMother } from "../../domain/AnnouncementTitleMother";

describe("AnnouncementTitleUpdater should", () => {
	const repository = new MockAnnouncementRepository();
	const eventBus = new MockEventBus();
	const updater = new AnnouncementTitleUpdater(repository, eventBus);

	it("update a valid announcement title", async () => {
		const expectedAnnouncement = AnnouncementMother.create(undefined, undefined, undefined, undefined, undefined, AnnouncementStatus.DRAFT);
		repository.shouldSearch(expectedAnnouncement);
		repository.shouldSave();
		const newTitle = AnnouncementTitleMother.create();

		await updater.update(expectedAnnouncement.toPrimitives().id, newTitle.value);

		const savedAnnouncement = repository.getSavedAnnouncement();
		expect(savedAnnouncement?.toPrimitives().title).toBe(newTitle.value);
		eventBus.assertLastPublishedEventIs(AnnouncementTitleUpdatedDomainEvent);
	});

	it("throw an error when announcement is archived", async () => {
		const expectedAnnouncement = AnnouncementMother.create(undefined, undefined, undefined, undefined, undefined, AnnouncementStatus.ARCHIVED);
		repository.shouldSearch(expectedAnnouncement);
		const newTitle = AnnouncementTitleMother.create();

		await expect(updater.update(expectedAnnouncement.toPrimitives().id, newTitle.value)).rejects.toThrow(AnnouncementIsArchivedError);
	});
});
