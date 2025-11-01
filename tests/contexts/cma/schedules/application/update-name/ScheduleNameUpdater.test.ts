import { ScheduleNameUpdater } from "../../../../../../src/contexts/cma/schedules/application/update-name/ScheduleNameUpdater";
import { Schedule } from "../../../../../../src/contexts/cma/schedules/domain/Schedule";
import { MockEventBus } from "../../../../shared/infrastructure/MockEventBus";
import { ScheduleMother } from "../../domain/ScheduleMother";
import { ScheduleNameMother } from "../../domain/ScheduleNameMother";
import { MockScheduleRepository } from "../../infrastructure/MockScheduleRepository";

describe("ScheduleNameUpdater should", () => {
	const repository = new MockScheduleRepository();
	const eventBus = new MockEventBus();
	const scheduleNameUpdater = new ScheduleNameUpdater(repository, eventBus);

	it("update schedule name", async () => {
		const schedule = ScheduleMother.create();
		const newName = ScheduleNameMother.create().value;
		const updatedSchedule = Schedule.fromPrimitives({
			...schedule.toPrimitives()
		});
		updatedSchedule.updateName(newName);

		repository.shouldSearch(schedule);
		repository.shouldSave();
		eventBus.shouldPublish(updatedSchedule.pullDomainEvents());

		await scheduleNameUpdater.update(schedule.getId().value, newName);
	});
});
