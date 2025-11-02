import { ActivitiesByCriteriaSearcher } from "../../../../../../src/contexts/cda/activities/application/search-all-by-criteria/ActivitiesByCriteriaSearcher";
import { CriteriaMother } from "../../../../shared/domain/criteria/CriteriaMother";
import { ActivityMother } from "../../domain/ActivityMother";
import { MockActivityRepository } from "../../infrastructure/MockActivityRepository";

describe("ActivitiesByCriteriaSearcher should", () => {
	const repository = new MockActivityRepository();
	const activitiesSearcher = new ActivitiesByCriteriaSearcher(repository);

	it("search activities by criteria", async () => {
		const criteria = CriteriaMother.create();
		const expectedActivities = [
			ActivityMother.create(),
			ActivityMother.create()
		];

		repository.shouldMatch(criteria, expectedActivities);

		const activities = await activitiesSearcher.search(
			[],
			null,
			null,
			null,
			null
		);

		expect(activities).toHaveLength(2);
	});
});
