import { SchedulesByCriteriaSearcher } from "../../../../../../src/contexts/cma/schedules/application/search-by-criteria/SchedulesByCriteriaSearcher";
import { CriteriaMother } from "../../../../shared/domain/criteria/CriteriaMother";
import { ScheduleMother } from "../../domain/ScheduleMother";
import { MockScheduleRepository } from "../../infrastructure/MockScheduleRepository";

describe("SchedulesByCriteriaSearcher should", () => {
	const repository = new MockScheduleRepository();
	const schedulesSearcher = new SchedulesByCriteriaSearcher(repository);

	it("search schedules by criteria", async () => {
		const criteria = CriteriaMother.create();
		const expectedSchedules = [
			ScheduleMother.create(),
			ScheduleMother.create()
		];

		repository.shouldMatch(criteria, expectedSchedules);

		const schedules = await schedulesSearcher.search(
			[],
			null,
			null,
			null,
			null
		);

		expect(schedules).toHaveLength(2);
	});
});
