import { EventFinder } from "../../../../../../src/contexts/cma/events/application/find/EventFinder";
import { EventMother } from "../../domain/EventMother";
import { MockEventRepository } from "../../infrastructure/MockEventRepository";

describe("EventFinder should", () => {
	const repository = new MockEventRepository();
	const eventFinder = new EventFinder(repository);

	it("find an existing event", async () => {
		const expectedEvent = EventMother.create();

		repository.shouldSearch(expectedEvent);

		const event = await eventFinder.find(expectedEvent.toPrimitives().id);

		expect(event.toPrimitives()).toEqual(expectedEvent.toPrimitives());
	});
});
