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

	it("archive an existing published announcement", async () => {
		const existingAnnouncement = AnnouncementMother.create({
			status: AnnouncementStatus.PUBLISHED
		});
		const expectedArchivedAnnouncement = AnnouncementMother.create({
			...existingAnnouncement.toPrimitives(),
			status: AnnouncementStatus.ARCHIVED
		});

		const expectedAnnouncementPrimitives = expectedArchivedAnnouncement.toPrimitives();

		const expectedDomainEvent = AnnouncementArchivedDomainEventMother.create(expectedAnnouncementPrimitives);

		repository.shouldSearch(existingAnnouncement);
		repository.shouldSave(expectedArchivedAnnouncement);
		eventBus.shouldPublish([expectedDomainEvent]);

		await archiver.archive(existingAnnouncement.getId());
	});

	it("throw an error when announcement is already archived", async () => {
		const expectedAnnouncement = AnnouncementMother.create({
			status: AnnouncementStatus.ARCHIVED
		});

		repository.shouldSearch(expectedAnnouncement);

		await expect(archiver.archive(expectedAnnouncement.getId())).rejects.toThrow(
			new AnnouncementIsArchivedError(expectedAnnouncement.getId())
		);
	});
});
