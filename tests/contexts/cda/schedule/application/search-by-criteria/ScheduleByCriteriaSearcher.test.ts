import { ScheduleByCriteriaSearcher } from "../../../../../../src/contexts/cda/schedule/application/search-by-criteria/ScheduleByCriteriaSearcher";
import { CriteriaMother } from "../../../../shared/domain/criteria/CriteriaMother";
import { ScheduleMother } from "../../domain/ScheduleMother";
import { MockScheduleRepository } from "../../infrastructure/MockScheduleRepository";

describe("ScheduleByCriteriaSearcher should", () => {
	const repository = new MockScheduleRepository();
	const schedulesSearcher = new ScheduleByCriteriaSearcher(repository);

	it("search schedules by criteria", async () => {
		const criteria = CriteriaMother.create();
		const expectedSchedules = [ScheduleMother.create(), ScheduleMother.create()];

		repository.shouldMatch(criteria, expectedSchedules);

		const schedules = await schedulesSearcher.searchByCriteria([], null, null, null, null);

		expect(schedules).toHaveLength(2);
	});
});
