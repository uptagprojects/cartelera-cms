import { AnnouncementPublisher } from "../../../../../../src/contexts/cma/announcements/application/publish/AnnouncementPublisher";
import { MockEventBus } from "../../../../shared/infrastructure/MockEventBus";
import { AnnouncementMother } from "../../domain/AnnouncementMother";
import { MockAnnouncementRepository } from "../../infrastructure/MockAnnouncementRepository";
import { Announcement } from "../../../../../../src/contexts/cma/announcements/domain/Announcement";

describe("AnnouncementPublisher should", () => {
	const repository = new MockAnnouncementRepository();
	const eventBus = new MockEventBus();
	const announcementPublisher = new AnnouncementPublisher(repository, eventBus);

	it("publish an existing announcement", async () => {
		const announcement = AnnouncementMother.create();
		const publishedAnnouncement = Announcement.fromPrimitives({
			...announcement.toPrimitives()
		});
		publishedAnnouncement.publish();

		repository.shouldSearch(announcement);
		repository.shouldSave();
		eventBus.shouldPublish(publishedAnnouncement.pullDomainEvents());

		await announcementPublisher.publish(announcement.getId());
	});
});
