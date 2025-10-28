import { AnnouncementContentUpdater } from "../../../../../../src/contexts/cma/announcements/application/update-content/AnnouncementContentUpdater";
import { MockEventBus } from "../../../../shared/infrastructure/MockEventBus";
import { AnnouncementMother } from "../../domain/AnnouncementMother";
import { AnnouncementContentMother } from "../../domain/AnnouncementContentMother";
import { MockAnnouncementRepository } from "../../infrastructure/MockAnnouncementRepository";
import { Announcement } from "../../../../../../src/contexts/cma/announcements/domain/Announcement";

describe("AnnouncementContentUpdater should", () => {
	const repository = new MockAnnouncementRepository();
	const eventBus = new MockEventBus();
	const announcementContentUpdater = new AnnouncementContentUpdater(repository, eventBus);

	it("update announcement content", async () => {
		const announcement = AnnouncementMother.create();
		const newContent = AnnouncementContentMother.create().value;
		const updatedAnnouncement = Announcement.fromPrimitives({
			...announcement.toPrimitives()
		});
		updatedAnnouncement.updateContent(newContent);

		repository.shouldSearch(announcement);
		repository.shouldSave();
		eventBus.shouldPublish(updatedAnnouncement.pullDomainEvents());

		await announcementContentUpdater.update(announcement.getId(), newContent);
	});
});
