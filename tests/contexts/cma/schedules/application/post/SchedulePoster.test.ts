import { SchedulePoster } from "../../../../../../src/contexts/cma/schedules/application/post/SchedulePoster";
import { Schedule } from "../../../../../../src/contexts/cma/schedules/domain/Schedule";
import { MockEventBus } from "../../../../shared/infrastructure/MockEventBus";
import { ScheduleFinishDateMother } from "../../domain/ScheduleFinishDateMother";
import { ScheduleIdMother } from "../../domain/ScheduleIdMother";
import { ScheduleNameMother } from "../../domain/ScheduleNameMother";
import { ScheduleStartDateMother } from "../../domain/ScheduleStartDateMother";
import { MockScheduleRepository } from "../../infrastructure/MockScheduleRepository";

describe("SchedulePoster should", () => {
	const repository = new MockScheduleRepository();
	const eventBus = new MockEventBus();
	const schedulePoster = new SchedulePoster(repository, eventBus);

	it("post a valid schedule", async () => {
		const id = ScheduleIdMother.create().value;
		const name = ScheduleNameMother.create().value;
		const startDate = ScheduleStartDateMother.create().value.toISOString();
		const finishDate = ScheduleFinishDateMother.create().value.toISOString();

		// Create a dummy schedule to get the event with the right structure
		const dummySchedule = Schedule.create(id, name, startDate, finishDate);
		const expectedEvent = dummySchedule.pullDomainEvents()[0];

		repository.shouldSave();
		eventBus.shouldPublish([expectedEvent]);

		await schedulePoster.post(id, name, startDate, finishDate);
	});
});
