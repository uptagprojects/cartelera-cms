import { EventLocationUpdater } from "../../../../../../src/contexts/cma/events/application/update-location/EventLocationUpdater";
import { Event } from "../../../../../../src/contexts/cma/events/domain/Event";
import { MockEventBus } from "../../../../shared/infrastructure/MockEventBus";
import { EventLocationMother } from "../../domain/EventLocationMother";
import { EventMother } from "../../domain/EventMother";
import { MockEventRepository } from "../../infrastructure/MockEventRepository";

describe("EventLocationUpdater should", () => {
	const repository = new MockEventRepository();
	const eventBus = new MockEventBus();
	const eventLocationUpdater = new EventLocationUpdater(repository, eventBus);

	it("update event location", async () => {
		const event = EventMother.create();
		const newLocation = EventLocationMother.create().value;
		const updatedEvent = Event.fromPrimitives({
			...event.toPrimitives()
		});
		updatedEvent.updateLocation(newLocation);

		repository.shouldSearch(event);
		repository.shouldSave();
		eventBus.shouldPublish(updatedEvent.pullDomainEvents());

		await eventLocationUpdater.update(event.toPrimitives().id, newLocation);
	});
});
