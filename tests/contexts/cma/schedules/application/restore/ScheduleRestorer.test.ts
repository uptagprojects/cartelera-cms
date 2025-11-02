import { ScheduleRestorer } from "../../../../../../src/contexts/cma/schedules/application/restore/ScheduleRestorer";
import { Schedule } from "../../../../../../src/contexts/cma/schedules/domain/Schedule";
import { ScheduleStatus } from "../../../../../../src/contexts/cma/schedules/domain/ScheduleStatus";
import { MockEventBus } from "../../../../shared/infrastructure/MockEventBus";
import { ScheduleMother } from "../../domain/ScheduleMother";
import { MockScheduleRepository } from "../../infrastructure/MockScheduleRepository";

describe("ScheduleRestorer should", () => {
	const repository = new MockScheduleRepository();
	const eventBus = new MockEventBus();
	const scheduleRestorer = new ScheduleRestorer(repository, eventBus);

	it("restore an archived schedule", async () => {
		const schedule = ScheduleMother.create({ status: ScheduleStatus.ARCHIVED });
		const restoredSchedule = Schedule.fromPrimitives({
			...schedule.toPrimitives()
		});
		restoredSchedule.restore();

		repository.shouldSearch(schedule);
		repository.shouldSave();
		eventBus.shouldPublish(restoredSchedule.pullDomainEvents());

		await scheduleRestorer.restore(schedule.getId().value);
	});
});
