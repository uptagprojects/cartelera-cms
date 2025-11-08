import { EventsByCriteriaSearcher } from "../../../../../../src/contexts/cda/events/application/search-by-criteria/EventsByCriteriaSearcher";
import { EventMother } from "../../domain/EventMother";
import { CriteriaMother } from "../../../../shared/domain/criteria/CriteriaMother";
import { MockEventRepository } from "../../infrastructure/MockEventRepository";

describe("EventsByCriteriaSearcher should", () => {
	const repository = new MockEventRepository();
	const eventsSearcher = new EventsByCriteriaSearcher(repository);

	it("search events by criteria", async () => {
		const criteria = CriteriaMother.create();
		const expectedEvents = [
			EventMother.create(),
			EventMother.create()
		];

		repository.shouldMatch(criteria, expectedEvents);

		const events = await eventsSearcher.search(
			[],
			null,
			null,
			null,
			null
		);

		expect(events).toHaveLength(2);
	});
});
