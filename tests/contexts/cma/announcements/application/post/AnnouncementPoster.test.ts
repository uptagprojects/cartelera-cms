import { AnnouncementPoster } from "../../../../../../src/contexts/cma/announcements/application/post/AnnouncementPoster";
import { Announcement } from "../../../../../../src/contexts/cma/announcements/domain/Announcement";
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

		// Mock Date to ensure consistent timestamps
		const fixedDate = new Date("2025-11-01T12:00:00.000Z");
		jest.spyOn(global, 'Date').mockImplementation(() => fixedDate as any);

		// Create a dummy announcement to get the event with the right structure
		const dummyAnnouncement = Announcement.create(id, title, type, content);
		const expectedEvent = dummyAnnouncement.pullDomainEvents()[0];

		repository.shouldSave();
		eventBus.shouldPublish([expectedEvent]);

		await announcementPoster.post(id, title, type, content);

		// Restore Date
		jest.restoreAllMocks();
	});
});
