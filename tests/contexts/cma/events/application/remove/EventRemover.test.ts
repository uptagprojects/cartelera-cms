import { EventRemover } from "../../../../../../src/contexts/cma/events/application/remove/EventRemover";
import { MockEventBus } from "../../../../shared/infrastructure/MockEventBus";
import { EventMother } from "../../domain/EventMother";
import { MockEventRepository } from "../../infrastructure/MockEventRepository";

describe("EventRemover should", () => {
	const repository = new MockEventRepository();
	const eventBus = new MockEventBus();
	const eventRemover = new EventRemover(repository, eventBus);

	it("remove an existing event", async () => {
		const event = EventMother.create();

		repository.shouldSearch(event);
		repository.shouldRemove();
		eventBus.shouldPublish([]);

		await eventRemover.remove(event.toPrimitives().id);
	});
});
