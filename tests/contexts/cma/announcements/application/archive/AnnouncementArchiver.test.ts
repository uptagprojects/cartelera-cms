import { AnnouncementArchiver } from "../../../../../../src/contexts/cma/announcements/application/archive/AnnouncementArchiver";
import { Announcement } from "../../../../../../src/contexts/cma/announcements/domain/Announcement";
import { MockEventBus } from "../../../../shared/infrastructure/MockEventBus";
import { AnnouncementMother } from "../../domain/AnnouncementMother";
import { MockAnnouncementRepository } from "../../infrastructure/MockAnnouncementRepository";

describe("AnnouncementArchiver should", () => {
	const repository = new MockAnnouncementRepository();
	const eventBus = new MockEventBus();
	const announcementArchiver = new AnnouncementArchiver(repository, eventBus);

	it("archive an existing announcement", async () => {
		const announcement = AnnouncementMother.create();
		const archivedAnnouncement = Announcement.fromPrimitives({
			...announcement.toPrimitives()
		});
		archivedAnnouncement.archive();

		repository.shouldSearch(announcement);
		repository.shouldSave();
		eventBus.shouldPublish(archivedAnnouncement.pullDomainEvents());

		await announcementArchiver.archive(announcement.getId());
	});
});
