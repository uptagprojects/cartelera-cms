import { UpdateAnnouncementOnPublished } from "../../../../../../src/contexts/cda/announcements/application/update-on-published/UpdateAnnouncementOnPublished";
import { PublishedAnnouncementUpdater } from "../../../../../../src/contexts/cda/announcements/application/update-on-published/PublishedAnnouncementUpdater";
import { AnnouncementPublishedDomainEvent } from "../../../../../../src/contexts/cma/announcements/domain/events/AnnouncementPublishedDomainEvent";
import { AnnouncementPublishedDomainEventMother } from "../../domain/events/AnnouncementPublishedDomainEventMother";
import { MockCdaAnnouncementRepository } from "../../infrastructure/MockCdaAnnouncementRepository";

describe("UpdateAnnouncementOnPublished should", () => {
	const repository = new MockCdaAnnouncementRepository();
	const updater = new PublishedAnnouncementUpdater(repository);
	const subscriber = new UpdateAnnouncementOnPublished(updater);

	it("be subscribed to AnnouncementPublishedDomainEvent", () => {
		const subscribedTo = subscriber.subscribedTo();

		expect(subscribedTo).toContain(AnnouncementPublishedDomainEvent);
	});

	it("have the correct name", () => {
		expect(subscriber.name()).toBe("pnfi.cda.update_announcement_on_published");
	});

	it("update announcement when AnnouncementPublishedDomainEvent is triggered", async () => {
		const event = AnnouncementPublishedDomainEventMother.create();

		repository.shouldSearch(null);
		repository.shouldSave();

		await subscriber.on(event);
	});
});
