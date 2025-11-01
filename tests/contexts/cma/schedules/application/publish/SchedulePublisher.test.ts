import { SchedulePublisher } from "../../../../../../src/contexts/cma/schedules/application/publish/SchedulePublisher";
import { Schedule } from "../../../../../../src/contexts/cma/schedules/domain/Schedule";
import { MockEventBus } from "../../../../shared/infrastructure/MockEventBus";
import { ScheduleMother } from "../../domain/ScheduleMother";
import { MockScheduleRepository } from "../../infrastructure/MockScheduleRepository";

describe("SchedulePublisher should", () => {
	const repository = new MockScheduleRepository();
	const eventBus = new MockEventBus();
	const schedulePublisher = new SchedulePublisher(repository, eventBus);

	it("publish an existing schedule", async () => {
		const schedule = ScheduleMother.create();
		const publishedSchedule = Schedule.fromPrimitives({
			...schedule.toPrimitives()
		});
		publishedSchedule.publish();

		repository.shouldSearch(schedule);
		repository.shouldSave();
		eventBus.shouldPublish(publishedSchedule.pullDomainEvents());

		await schedulePublisher.publish(schedule.getId().value);
	});
});
