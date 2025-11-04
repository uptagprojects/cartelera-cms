import { UpdateEventOnPublished } from "../../../../../../src/contexts/cda/events/application/update-on-published/UpdateEventOnPublished";
import { PublishedEventUpdater } from "../../../../../../src/contexts/cda/events/application/update-on-published/PublishedEventUpdater";
import { EventPublishedDomainEventMother } from "../../../../cma/events/domain/event/EventPublishedDomainEventMother";
import { MockEventRepository } from "../../infrastructure/MockEventRepository";

describe("UpdateEventOnPublished should", () => {
	const repository = new MockEventRepository();
	const subscriber = new UpdateEventOnPublished(
		new PublishedEventUpdater(repository)
	);

	it("update an event when it is published", async () => {
		const domainEvent = EventPublishedDomainEventMother.create();

		repository.shouldSearch(null);
		repository.shouldSave();

		await subscriber.on(domainEvent);
	});
});
