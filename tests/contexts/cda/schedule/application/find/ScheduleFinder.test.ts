import { ScheduleFinder } from "../../../../../../src/contexts/cda/schedule/application/find/ScheduleFinder";
import { ScheduleMother } from "../../domain/ScheduleMother";
import { MockScheduleRepository } from "../../infrastructure/MockScheduleRepository";

describe("ScheduleFinder should", () => {
	const repository = new MockScheduleRepository();
	const scheduleFinder = new ScheduleFinder(repository);

	it("find an existing schedule", async () => {
		const expectedSchedule = ScheduleMother.create();

		repository.shouldSearch(expectedSchedule);

		const schedule = await scheduleFinder.find(expectedSchedule.getId().value);

		expect(schedule).toEqual(expectedSchedule);
	});
});
