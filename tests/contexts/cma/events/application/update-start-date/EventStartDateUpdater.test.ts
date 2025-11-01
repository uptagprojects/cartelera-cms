import { EventStartDateUpdater } from "../../../../../../src/contexts/cma/events/application/update-start-date/EventStartDateUpdater";
import { Event } from "../../../../../../src/contexts/cma/events/domain/Event";
import { MockEventBus } from "../../../../shared/infrastructure/MockEventBus";
import { EventMother } from "../../domain/EventMother";
import { EventStartDateMother } from "../../domain/EventStartDateMother";
import { MockEventRepository } from "../../infrastructure/MockEventRepository";

describe("EventStartDateUpdater should", () => {
	const repository = new MockEventRepository();
	const eventBus = new MockEventBus();
	const eventStartDateUpdater = new EventStartDateUpdater(repository, eventBus);

	it("update event start date", async () => {
		const event = EventMother.create();
		const newStartDate = EventStartDateMother.create().value.toISOString();
		const updatedEvent = Event.fromPrimitives({
			...event.toPrimitives()
		});
		updatedEvent.updateStartDate(newStartDate);

		repository.shouldSearch(event);
		repository.shouldSave();
		eventBus.shouldPublish(updatedEvent.pullDomainEvents());

		await eventStartDateUpdater.update(event.toPrimitives().id, newStartDate);
	});
});
