import { AnnouncementRestorer } from "../../../../../../src/contexts/cma/announcements/application/restore/AnnouncementRestorer";
import { AnnouncementIsNotArchivedError } from "../../../../../../src/contexts/cma/announcements/domain/AnnouncementIsNotArchivedError";
import { AnnouncementStatus } from "../../../../../../src/contexts/cma/announcements/domain/AnnouncementStatus";
import { AnnouncementRestoredDomainEventMother } from "../../domain/event/AnnouncementRestoredDomainEventMother";
import { MockEventBus } from "../../../../shared/infrastructure/MockEventBus";
import { AnnouncementMother } from "../../domain/AnnouncementMother";
import { MockAnnouncementRepository } from "../../infrastructure/MockAnnouncementRepository";

describe("AnnouncementRestorer should", () => {
	const repository = new MockAnnouncementRepository();
	const eventBus = new MockEventBus();
	const restorer = new AnnouncementRestorer(repository, eventBus);

	it("restore a valid announcement", async () => {
		const expectedAnnouncement = AnnouncementMother.create(undefined, undefined, undefined, undefined, undefined, AnnouncementStatus.ARCHIVED);
		const expectedDomainEvent = AnnouncementRestoredDomainEventMother.create(expectedAnnouncement);
		repository.shouldSearch(expectedAnnouncement);
		repository.shouldSave();
		eventBus.shouldPublish([expectedDomainEvent]);

		await restorer.restore(expectedAnnouncement.toPrimitives().id);

		const savedAnnouncement = repository.getSavedAnnouncement();
		expect(savedAnnouncement?.isDraft()).toBe(true);
	});

	it("throw an error when announcement is not archived", async () => {
		const expectedAnnouncement = AnnouncementMother.create(undefined, undefined, undefined, undefined, undefined, AnnouncementStatus.DRAFT);
		repository.shouldSearch(expectedAnnouncement);

		await expect(restorer.restore(expectedAnnouncement.toPrimitives().id)).rejects.toThrow(AnnouncementIsNotArchivedError);
	});
});
