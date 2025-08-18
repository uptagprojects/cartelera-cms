import { AnnouncementPublisher } from "../../../../../../src/contexts/cma/announcements/application/publish/AnnouncementPublisher";
import { AnnouncementStatus } from "../../../../../../src/contexts/cma/announcements/domain/AnnouncementStatus";
import { AnnouncementPublishedDomainEventMother } from "../../domain/event/AnnouncementPublishedDomainEventMother";
import { MockEventBus } from "../../../../shared/infrastructure/MockEventBus";
import { AnnouncementMother } from "../../domain/AnnouncementMother";
import { MockAnnouncementRepository } from "../../infrastructure/MockAnnouncementRepository";

describe("AnnouncementPublisher should", () => {
	const repository = new MockAnnouncementRepository();
	const eventBus = new MockEventBus();
	const publisher = new AnnouncementPublisher(repository, eventBus);

	it("publish a valid announcement", async () => {
		const expectedAnnouncement = AnnouncementMother.create(undefined, undefined, undefined, undefined, undefined, AnnouncementStatus.DRAFT);
		const expectedDomainEvent = AnnouncementPublishedDomainEventMother.create(expectedAnnouncement);
		repository.shouldSearch(expectedAnnouncement);
		repository.shouldSave();
		eventBus.shouldPublish([expectedDomainEvent]);

		await publisher.publish(expectedAnnouncement.toPrimitives().id);

		const savedAnnouncement = repository.getSavedAnnouncement();
		expect(savedAnnouncement?.isPublished()).toBe(true);
	});
});
