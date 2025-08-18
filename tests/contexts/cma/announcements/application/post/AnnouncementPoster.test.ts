import { AnnouncementPoster } from "../../../../../../src/contexts/cma/announcements/application/post/AnnouncementPoster";
import { AnnouncementPostedDomainEvent } from "../../../../../../src/contexts/cma/announcements/domain/event/AnnouncementPostedDomainEvent";
import { MockEventBus } from "../../../../shared/infrastructure/MockEventBus";
import { AnnouncementMother } from "../../domain/AnnouncementMother";
import { AnnouncementPostedDomainEventMother } from "../../domain/event/AnnouncementPostedDomainEventMother";
import { MockAnnouncementRepository } from "../../infrastructure/MockAnnouncementRepository";

describe("AnnouncementPoster should", () => {
	const repository = new MockAnnouncementRepository();
	const eventBus = new MockEventBus();
	const poster = new AnnouncementPoster(repository, eventBus);

	it("post a valid announcement", async () => {
		const expectedAnnouncement = AnnouncementMother.create();
		const expectedAnnouncementPrimitives = expectedAnnouncement.toPrimitives();
		const expectedDomainEvent = AnnouncementPostedDomainEventMother.create(expectedAnnouncementPrimitives);
		repository.shouldSave(expectedAnnouncement);

		eventBus.shouldPublish([expectedDomainEvent]);

		await poster.post(
			expectedAnnouncementPrimitives.id,
			expectedAnnouncementPrimitives.title,
			expectedAnnouncementPrimitives.type,
			expectedAnnouncementPrimitives.content
		);
	});
});
