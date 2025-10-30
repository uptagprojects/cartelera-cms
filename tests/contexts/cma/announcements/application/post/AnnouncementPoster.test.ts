import { AnnouncementPoster } from "../../../../../../src/contexts/cma/announcements/application/post/AnnouncementPoster";
import { MockEventBus } from "../../../../shared/infrastructure/MockEventBus";
import { AnnouncementIdMother } from "../../domain/AnnouncementIdMother";
import { AnnouncementTitleMother } from "../../domain/AnnouncementTitleMother";
import { AnnouncementContentMother } from "../../domain/AnnouncementContentMother";
import { AnnouncementTypeMother } from "../../domain/AnnouncementTypeMother";
import { MockAnnouncementRepository } from "../../infrastructure/MockAnnouncementRepository";

describe("AnnouncementPoster should", () => {
	const repository = new MockAnnouncementRepository();
	const eventBus = new MockEventBus();
	const announcementPoster = new AnnouncementPoster(repository, eventBus);

	it("post a valid announcement", async () => {
		const id = AnnouncementIdMother.create().value;
		const title = AnnouncementTitleMother.create().value;
		const type = AnnouncementTypeMother.create();
		const content = AnnouncementContentMother.create().value;

		repository.shouldSave();
		eventBus.shouldPublish([]);

		await announcementPoster.post(id, title, type, content);
	});
});
