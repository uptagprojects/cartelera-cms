import { ScheduleFinishDateUpdater } from "../../../../../../src/contexts/cma/schedules/application/update-finish-date/ScheduleFinishDateUpdater";
import { Schedule } from "../../../../../../src/contexts/cma/schedules/domain/Schedule";
import { MockEventBus } from "../../../../shared/infrastructure/MockEventBus";
import { ScheduleMother } from "../../domain/ScheduleMother";
import { ScheduleFinishDateMother } from "../../domain/ScheduleFinishDateMother";
import { MockScheduleRepository } from "../../infrastructure/MockScheduleRepository";

describe("ScheduleFinishDateUpdater should", () => {
	const repository = new MockScheduleRepository();
	const eventBus = new MockEventBus();
	const scheduleFinishDateUpdater = new ScheduleFinishDateUpdater(repository, eventBus);

	it("update schedule finish date", async () => {
		const schedule = ScheduleMother.create();
		const newFinishDate = ScheduleFinishDateMother.create().value.toISOString();
		const updatedSchedule = Schedule.fromPrimitives({
			...schedule.toPrimitives()
		});
		updatedSchedule.updateFinishDate(newFinishDate);

		repository.shouldSearch(schedule);
		repository.shouldSave();
		eventBus.shouldPublish(updatedSchedule.pullDomainEvents());

		await scheduleFinishDateUpdater.update(schedule.getId().value, newFinishDate);
	});
});
