import { Service } from "diod";
import { ScheduleRepository } from "../../domain/ScheduleRepository";
import { ScheduleAttachmentsByScheduleSearcher } from "../../../../cma/schedule-attachments/application/search-all-by-schedule/ScheduleAttachmentsByScheduleSearcher";
import { ScheduleId } from "../../domain/ScheduleId";
import { Schedule } from "../../domain/Schedule";

@Service()
export class PublishedScheduleUpdater {
    constructor(
        private readonly repository: ScheduleRepository,
        private readonly attachmentSearcher: ScheduleAttachmentsByScheduleSearcher,
    ) { }

    async update(
        id: string,
        name: string,
        startDate: string,
        endDate: string,
    ): Promise<void> {
        let schedule = await this.repository.search(new ScheduleId(id));
        const attachments = (await this.attachmentSearcher.search(id)).map((attachment) => attachment.toPrimitives().url);

        if (!schedule) {

            schedule = Schedule.create(
                id,
                name,
                startDate,
                endDate,
                attachments
            );
        } else {
            schedule.updateName(name),
            schedule.updateStartDate(startDate);
            schedule.updateEndDate(endDate);
            schedule.updateAttachments(attachments);
        }

        await this.repository.save(schedule);
    }
}