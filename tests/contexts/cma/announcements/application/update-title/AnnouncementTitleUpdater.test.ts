import { AnnouncementTitleUpdater } from "../../../../../../src/contexts/cma/announcements/application/update-title/AnnouncementTitleUpdater";
import { MockEventBus } from "../../../../shared/infrastructure/MockEventBus";
import { AnnouncementMother } from "../../domain/AnnouncementMother";
import { AnnouncementTitleMother } from "../../domain/AnnouncementTitleMother";
import { MockAnnouncementRepository } from "../../infrastructure/MockAnnouncementRepository";
import { Announcement } from "../../../../../../src/contexts/cma/announcements/domain/Announcement";

describe("AnnouncementTitleUpdater should", () => {
	const repository = new MockAnnouncementRepository();
	const eventBus = new MockEventBus();
	const announcementTitleUpdater = new AnnouncementTitleUpdater(repository, eventBus);

	it("update announcement title", async () => {
		const announcement = AnnouncementMother.create();
		const newTitle = AnnouncementTitleMother.create().value;
		const updatedAnnouncement = Announcement.fromPrimitives({
			...announcement.toPrimitives()
		});
		updatedAnnouncement.updateTitle(newTitle);

		repository.shouldSearch(announcement);
		repository.shouldSave();
		eventBus.shouldPublish(updatedAnnouncement.pullDomainEvents());

		await announcementTitleUpdater.update(announcement.getId(), newTitle);
	});
});
