import { AnnouncementPoster } from "../../../../../../src/contexts/cma/announcements/application/post/AnnouncementPoster";
import { MockEventBus } from "../../../../shared/infrastructure/MockEventBus";
import { AnnouncementMother } from "../../domain/AnnouncementMother";
import { AnnouncementPostedDomainEventMother } from "../../domain/events/AnnouncementPostedDomainEventMother";
import { MockAnnouncementRepository } from "../../infrastructure/MockAnnouncementRepository";

describe("AnnouncementPoster should", () => {
	const repository = new MockAnnouncementRepository();
	const eventBus = new MockEventBus();
	const announcementPoster = new AnnouncementPoster(repository, eventBus);

	it("post a valid announcement", async () => {
		const expectedAnnouncement = AnnouncementMother.create();
		const expectedAnnouncementPrimitives = expectedAnnouncement.toPrimitives();
		const expectedDomainEvent = AnnouncementPostedDomainEventMother.create(
			expectedAnnouncementPrimitives
		);

		repository.shouldSave(expectedAnnouncement);
		eventBus.shouldPublish([expectedDomainEvent]);

		await announcementPoster.post(
			expectedAnnouncementPrimitives.id,
			expectedAnnouncementPrimitives.title,
			expectedAnnouncementPrimitives.type,
			expectedAnnouncementPrimitives.content
		);
	});
});
