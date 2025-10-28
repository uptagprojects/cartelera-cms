import { AnnouncementRestorer } from "../../../../../../src/contexts/cma/announcements/application/restore/AnnouncementRestorer";
import { MockEventBus } from "../../../../shared/infrastructure/MockEventBus";
import { AnnouncementMother } from "../../domain/AnnouncementMother";
import { AnnouncementStatus } from "../../../../../../src/contexts/cma/announcements/domain/AnnouncementStatus";
import { MockAnnouncementRepository } from "../../infrastructure/MockAnnouncementRepository";
import { Announcement } from "../../../../../../src/contexts/cma/announcements/domain/Announcement";

describe("AnnouncementRestorer should", () => {
	const repository = new MockAnnouncementRepository();
	const eventBus = new MockEventBus();
	const announcementRestorer = new AnnouncementRestorer(repository, eventBus);

	it("restore an archived announcement", async () => {
		const announcement = AnnouncementMother.create({ status: AnnouncementStatus.ARCHIVED });
		const restoredAnnouncement = Announcement.fromPrimitives({
			...announcement.toPrimitives()
		});
		restoredAnnouncement.restore();

		repository.shouldSearch(announcement);
		repository.shouldSave();
		eventBus.shouldPublish(restoredAnnouncement.pullDomainEvents());

		await announcementRestorer.restore(announcement.getId());
	});
});
