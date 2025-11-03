import { RemoveOnAnnouncementUnpublished } from "../../../../../../src/contexts/cda/announcements/application/remove-on-unpublished/RemoveOnAnnouncementUnpublished";
import { UnpublishedAnnouncementRemover } from "../../../../../../src/contexts/cda/announcements/application/remove-on-unpublished/UnpublishedAnnouncementRemover";
import { AnnouncementArchivedDomainEvent } from "../../../../../../src/contexts/cma/announcements/domain/events/AnnouncementArchivedDomainEvent";
import { AnnouncementRemovedDomainEvent } from "../../../../../../src/contexts/cma/announcements/domain/events/AnnouncementRemovedDomainEvent";
import { AnnouncementArchivedDomainEventMother } from "../../domain/events/AnnouncementArchivedDomainEventMother";
import { AnnouncementRemovedDomainEventMother } from "../../domain/events/AnnouncementRemovedDomainEventMother";
import { MockCdaAnnouncementRepository } from "../../infrastructure/MockCdaAnnouncementRepository";

describe("RemoveOnAnnouncementUnpublished should", () => {
	const repository = new MockCdaAnnouncementRepository();
	const remover = new UnpublishedAnnouncementRemover(repository);
	const subscriber = new RemoveOnAnnouncementUnpublished(remover);

	it("be subscribed to AnnouncementRemovedDomainEvent and AnnouncementArchivedDomainEvent", () => {
		const subscribedTo = subscriber.subscribedTo();

		expect(subscribedTo).toContain(AnnouncementRemovedDomainEvent);
		expect(subscribedTo).toContain(AnnouncementArchivedDomainEvent);
	});

	it("have the correct name", () => {
		expect(subscriber.name()).toBe("pnfi.cda.remove_announcement_on_unpublished");
	});

	it("remove announcement when AnnouncementRemovedDomainEvent is triggered", async () => {
		const event = AnnouncementRemovedDomainEventMother.create();

		repository.shouldSearch(null);

		await subscriber.on(event);
	});

	it("remove announcement when AnnouncementArchivedDomainEvent is triggered", async () => {
		const event = AnnouncementArchivedDomainEventMother.create();

		repository.shouldSearch(null);

		await subscriber.on(event);
	});
});
