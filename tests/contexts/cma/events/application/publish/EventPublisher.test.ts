import { EventPublisher } from "../../../../../../src/contexts/cma/events/application/publish/EventPublisher";
import { Event } from "../../../../../../src/contexts/cma/events/domain/Event";
import { MockEventBus } from "../../../../shared/infrastructure/MockEventBus";
import { EventMother } from "../../domain/EventMother";
import { MockEventRepository } from "../../infrastructure/MockEventRepository";

describe("EventPublisher should", () => {
	const repository = new MockEventRepository();
	const eventBus = new MockEventBus();
	const eventPublisher = new EventPublisher(repository, eventBus);

	it("publish a new event", async () => {
		const eventPrimitives = EventMother.create().toPrimitives();
		const publishedEvent = Event.create(
			eventPrimitives.id,
			eventPrimitives.name,
			eventPrimitives.location,
			eventPrimitives.startDate,
			eventPrimitives.endDate
		);

		repository.shouldSave();
		eventBus.shouldPublish(publishedEvent.pullDomainEvents());

		await eventPublisher.publish(
			eventPrimitives.id,
			eventPrimitives.name,
			eventPrimitives.location,
			eventPrimitives.startDate,
			eventPrimitives.endDate
		);
	});
});
