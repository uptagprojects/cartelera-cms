import { ScheduleArchiver } from "../../../../../../src/contexts/cma/schedules/application/archive/ScheduleArchiver";
import { Schedule } from "../../../../../../src/contexts/cma/schedules/domain/Schedule";
import { MockEventBus } from "../../../../shared/infrastructure/MockEventBus";
import { ScheduleMother } from "../../domain/ScheduleMother";
import { MockScheduleRepository } from "../../infrastructure/MockScheduleRepository";

describe("ScheduleArchiver should", () => {
	const repository = new MockScheduleRepository();
	const eventBus = new MockEventBus();
	const scheduleArchiver = new ScheduleArchiver(repository, eventBus);

	it("archive an existing schedule", async () => {
		const schedule = ScheduleMother.create();
		const archivedSchedule = Schedule.fromPrimitives({
			...schedule.toPrimitives()
		});
		archivedSchedule.archive();

		repository.shouldSearch(schedule);
		repository.shouldSave();
		eventBus.shouldPublish(archivedSchedule.pullDomainEvents());

		await scheduleArchiver.archive(schedule.getId().value);
	});
});
