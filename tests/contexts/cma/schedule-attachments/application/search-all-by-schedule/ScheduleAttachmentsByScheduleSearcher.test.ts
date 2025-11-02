import { ScheduleAttachmentsByScheduleSearcher } from "../../../../../../src/contexts/cma/schedule-attachments/application/search-all-by-schedule/ScheduleAttachmentsByScheduleSearcher";
import { ScheduleIdMother } from "../../../schedules/domain/ScheduleIdMother";
import { ScheduleAttachmentMother } from "../../domain/ScheduleAttachmentMother";
import { MockScheduleAttachmentRepository } from "../../infrastructure/MockScheduleAttachmentRepository";

describe("ScheduleAttachmentsByScheduleSearcher should", () => {
	const repository = new MockScheduleAttachmentRepository();
	const searcher = new ScheduleAttachmentsByScheduleSearcher(repository);

	it("search all attachments by schedule id", async () => {
		const scheduleId = ScheduleIdMother.create();
		const attachment1 = ScheduleAttachmentMother.create({ scheduleId: scheduleId.value });
		const attachment2 = ScheduleAttachmentMother.create({ scheduleId: scheduleId.value });
		const attachments = [attachment1, attachment2];

		repository.shouldSearchAllByScheduleId(attachments);

		const result = await searcher.search(scheduleId.value);

		expect(result).toEqual(attachments);
	});

	it("return empty array when no attachments found", async () => {
		const scheduleId = ScheduleIdMother.create();

		repository.shouldSearchAllByScheduleId([]);

		const result = await searcher.search(scheduleId.value);

		expect(result).toEqual([]);
	});
});
