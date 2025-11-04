import { AnnouncementArchiver } from "../../../../../../src/contexts/cma/announcements/application/archive/AnnouncementArchiver";
import { Announcement } from "../../../../../../src/contexts/cma/announcements/domain/Announcement";
import { AnnouncementDoesNotExistError } from "../../../../../../src/contexts/cma/announcements/domain/AnnouncementDoesNotExistError";
import { AnnouncementStatus } from "../../../../../../src/contexts/cma/announcements/domain/AnnouncementStatus";
import { MockEventBus } from "../../../../shared/infrastructure/MockEventBus";
import { AnnouncementIdMother } from "../../domain/AnnouncementIdMother";
import { AnnouncementMother } from "../../domain/AnnouncementMother";
import { AnnouncementArchivedDomainEventMother } from "../../domain/events/AnnouncementArchivedDomainEventMother";
import { MockAnnouncementRepository } from "../../infrastructure/MockAnnouncementRepository";

describe("AnnouncementArchiver should", () => {
	const repository = new MockAnnouncementRepository();
	const eventBus = new MockEventBus();
	const announcementArchiver = new AnnouncementArchiver(repository, eventBus);

	it("throw an error archiving a non existing announcement", async () => {
		const nonExistingAnnouncementId = AnnouncementIdMother.create();
		repository.shouldSearchAndReturnNull(nonExistingAnnouncementId);

		await expect(announcementArchiver.archive(nonExistingAnnouncementId.value)).rejects.toThrow(
			new AnnouncementDoesNotExistError(nonExistingAnnouncementId.value)
		);
	});

	it("archive an existing announcement", async () => {
		const existingAnnouncement = AnnouncementMother.create();
		const existingAnnouncementPrimitives = existingAnnouncement.toPrimitives();
		const expectedDomainEvent = AnnouncementArchivedDomainEventMother.create(
			existingAnnouncementPrimitives
		);

		const archivedAnnouncement = Announcement.fromPrimitives({
			...existingAnnouncementPrimitives,
			status: AnnouncementStatus.ARCHIVED
		});

		repository.shouldSearch(existingAnnouncement);
		repository.shouldSave(archivedAnnouncement);
		eventBus.shouldPublish([expectedDomainEvent]);

		await announcementArchiver.archive(existingAnnouncement.getId());
	});
});
