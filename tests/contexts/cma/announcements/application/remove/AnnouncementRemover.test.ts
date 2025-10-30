import { AnnouncementRemover } from "../../../../../../src/contexts/cma/announcements/application/remove/AnnouncementRemover";
import { MockEventBus } from "../../../../shared/infrastructure/MockEventBus";
import { AnnouncementMother } from "../../domain/AnnouncementMother";
import { MockAnnouncementRepository } from "../../infrastructure/MockAnnouncementRepository";

describe("AnnouncementRemover should", () => {
	const repository = new MockAnnouncementRepository();
	const eventBus = new MockEventBus();
	const announcementRemover = new AnnouncementRemover(repository, eventBus);

	it("remove an existing announcement", async () => {
		const announcement = AnnouncementMother.create();

		repository.shouldSearch(announcement);
		repository.shouldRemove();
		eventBus.shouldPublish([]);

		await announcementRemover.remove(announcement.getId());
	});
});
