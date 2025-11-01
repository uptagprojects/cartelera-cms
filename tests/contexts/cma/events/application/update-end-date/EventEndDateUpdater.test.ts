import { EventEndDateUpdater } from "../../../../../../src/contexts/cma/events/application/update-end-date/EventEndDateUpdater";
import { Event } from "../../../../../../src/contexts/cma/events/domain/Event";
import { MockEventBus } from "../../../../shared/infrastructure/MockEventBus";
import { EventEndDateMother } from "../../domain/EventEndDateMother";
import { EventMother } from "../../domain/EventMother";
import { MockEventRepository } from "../../infrastructure/MockEventRepository";

describe("EventEndDateUpdater should", () => {
	const repository = new MockEventRepository();
	const eventBus = new MockEventBus();
	const eventEndDateUpdater = new EventEndDateUpdater(repository, eventBus);

	it("update event end date", async () => {
		const event = EventMother.create();
		const newEndDate = EventEndDateMother.create().value.toISOString();
		const updatedEvent = Event.fromPrimitives({
			...event.toPrimitives()
		});
		updatedEvent.updateEndDate(newEndDate);

		repository.shouldSearch(event);
		repository.shouldSave();
		eventBus.shouldPublish(updatedEvent.pullDomainEvents());

		await eventEndDateUpdater.update(event.toPrimitives().id, newEndDate);
	});
});
