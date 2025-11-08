import { AllSchedulesSearcher } from "../../../../../../src/contexts/cda/schedule/application/search-all/AllSchedulesSearcher";
import { ScheduleMother } from "../../domain/ScheduleMother";
import { MockScheduleRepository } from "../../infrastructure/MockScheduleRepository";

describe("AllSchedulesSearcher should", () => {
	const repository = new MockScheduleRepository();
	const searcher = new AllSchedulesSearcher(repository);

	it("search all schedules", async () => {
		const schedule1 = ScheduleMother.create();
		const schedule2 = ScheduleMother.create();
		const schedules = [schedule1, schedule2];

		repository.shouldSearchAll(schedules);

		const result = await searcher.searchAll();

		expect(result).toHaveLength(2);
		expect(result).toEqual(schedules);
	});

	it("return empty array when no schedules exist", async () => {
		repository.shouldSearchAll([]);

		const result = await searcher.searchAll();

		expect(result).toHaveLength(0);
		expect(result).toEqual([]);
	});
});
