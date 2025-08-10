import { AnnouncementArchiver } from "../../../../../../src/contexts/cma/announcements/application/archive/AnnouncementArchiver";
import { AnnouncementIsArchivedError } from "../../../../../../src/contexts/cma/announcements/domain/AnnouncementIsArchivedError";
import { AnnouncementStatus } from "../../../../../../src/contexts/cma/announcements/domain/AnnouncementStatus";
import { AnnouncementArchivedDomainEventMother } from "../../domain/event/AnnouncementArchivedDomainEventMother";
import { MockEventBus } from "../../../../shared/infrastructure/MockEventBus";
import { AnnouncementMother } from "../../domain/AnnouncementMother";
import { MockAnnouncementRepository } from "../../infrastructure/MockAnnouncementRepository";

describe("AnnouncementArchiver should", () => {
	const repository = new MockAnnouncementRepository();
	const eventBus = new MockEventBus();
	const archiver = new AnnouncementArchiver(repository, eventBus);

	it("archive a valid announcement", async () => {
		const expectedAnnouncement = AnnouncementMother.create(undefined, undefined, undefined, undefined, undefined, AnnouncementStatus.DRAFT);
		const expectedDomainEvent = AnnouncementArchivedDomainEventMother.create(expectedAnnouncement);
		repository.shouldSearch(expectedAnnouncement);
		repository.shouldSave();
		eventBus.shouldPublish([expectedDomainEvent]);

		await archiver.archive(expectedAnnouncement.toPrimitives().id);

		const savedAnnouncement = repository.getSavedAnnouncement();
		expect(savedAnnouncement?.isArchived()).toBe(true);
	});

	it("throw an error when announcement is already archived", async () => {
		const expectedAnnouncement = AnnouncementMother.create(undefined, undefined, undefined, undefined, undefined, AnnouncementStatus.ARCHIVED);
		repository.shouldSearch(expectedAnnouncement);

		await expect(archiver.archive(expectedAnnouncement.toPrimitives().id)).rejects.toThrow(AnnouncementIsArchivedError);
	});
});
