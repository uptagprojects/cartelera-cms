import { ScheduleStartDateUpdater } from "../../../../../../src/contexts/cma/schedules/application/update-start-date/ScheduleStartDateUpdater";
import { Schedule } from "../../../../../../src/contexts/cma/schedules/domain/Schedule";
import { MockEventBus } from "../../../../shared/infrastructure/MockEventBus";
import { ScheduleMother } from "../../domain/ScheduleMother";
import { ScheduleStartDateMother } from "../../domain/ScheduleStartDateMother";
import { MockScheduleRepository } from "../../infrastructure/MockScheduleRepository";

describe("ScheduleStartDateUpdater should", () => {
	const repository = new MockScheduleRepository();
	const eventBus = new MockEventBus();
	const scheduleStartDateUpdater = new ScheduleStartDateUpdater(repository, eventBus);

	it("update schedule start date", async () => {
		const schedule = ScheduleMother.create();
		const newStartDate = ScheduleStartDateMother.create().value.toISOString();
		const updatedSchedule = Schedule.fromPrimitives({
			...schedule.toPrimitives()
		});
		updatedSchedule.updateStartDate(newStartDate);

		repository.shouldSearch(schedule);
		repository.shouldSave();
		eventBus.shouldPublish(updatedSchedule.pullDomainEvents());

		await scheduleStartDateUpdater.update(schedule.getId().value, newStartDate);
	});
});
