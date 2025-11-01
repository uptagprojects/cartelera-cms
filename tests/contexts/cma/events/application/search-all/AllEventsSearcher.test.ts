import { AllEventsSearcher } from "../../../../../../src/contexts/cma/events/application/search-all/AllEventsSearcher";
import { EventMother } from "../../domain/EventMother";
import { MockEventRepository } from "../../infrastructure/MockEventRepository";

describe("AllEventsSearcher should", () => {
	const repository = new MockEventRepository();
	const allEventsSearcher = new AllEventsSearcher(repository);

	it("search all events", async () => {
		const expectedEvents = [EventMother.create(), EventMother.create()];

		repository.shouldSearchAll(expectedEvents);

		const events = await allEventsSearcher.searchAll();

		expect(events).toHaveLength(2);
	});
});
