import { EventNameUpdater } from "../../../../../../src/contexts/cma/events/application/update-name/EventNameUpdater";
import { Event } from "../../../../../../src/contexts/cma/events/domain/Event";
import { MockEventBus } from "../../../../shared/infrastructure/MockEventBus";
import { EventMother } from "../../domain/EventMother";
import { EventNameMother } from "../../domain/EventNameMother";
import { MockEventRepository } from "../../infrastructure/MockEventRepository";

describe("EventNameUpdater should", () => {
	const repository = new MockEventRepository();
	const eventBus = new MockEventBus();
	const eventNameUpdater = new EventNameUpdater(repository, eventBus);

	it("update event name", async () => {
		const event = EventMother.create();
		const newName = EventNameMother.create().value;
		const updatedEvent = Event.fromPrimitives({
			...event.toPrimitives()
		});
		updatedEvent.updateName(newName);

		repository.shouldSearch(event);
		repository.shouldSave();
		eventBus.shouldPublish(updatedEvent.pullDomainEvents());

		await eventNameUpdater.update(event.toPrimitives().id, newName);
	});
});
