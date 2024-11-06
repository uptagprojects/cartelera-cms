import { ScheduleAttachment } from "./ScheduleAttachment";
import { ScheduleFinishDate } from "./ScheduleFinishDate";
import { ScheduleId } from "./ScheduleId";
import { ScheduleName } from "./ScheduleName";
import { ScheduleStartDate } from "./ScheduleStartDate";

export interface SchedulePrimitives {
    id: string;
    name: string;
    startDate: string;
    finishDate: string;
    attachments: string[];
}

export class Schedule {
    constructor(
        private readonly id: ScheduleId,
        private name: ScheduleName,
        private startDate: ScheduleStartDate,
        private finishDate: ScheduleFinishDate,
        private attachments: ScheduleAttachment[]

    ) { }

    static create(id: string, name: string, startDate: string, finishDate: string, attachments: string[]): Schedule {
        const schedule = new Schedule(
            new ScheduleId(id),
            new ScheduleName(name),
            new ScheduleStartDate(startDate),
            new ScheduleFinishDate(finishDate),
            attachments.map(v => new ScheduleAttachment(v))
        );

        return schedule;
    }

    static fromPrimitives(primitives: SchedulePrimitives): Schedule {
        return new Schedule(
            new ScheduleId(primitives.id),
            new ScheduleName(primitives.name),
            new ScheduleStartDate(primitives.startDate),
            new ScheduleFinishDate(primitives.finishDate),
            primitives.attachments.map(v => new ScheduleAttachment(v))

        )
    }

    getId(): ScheduleId {
        return this.id;
    }

    toPrimitives(): SchedulePrimitives {
        return {
            id: this.id.value,
            name: this.name.value,
            startDate: this.startDate.value.toString(),
            finishDate: this.finishDate.value.toString(),
            attachments: this.attachments.map(v => v.value)
        }
    }

    updateName(name: string): void {
        this.name = new ScheduleName(name);
    }

    updateEndDate(finishDate: string): void {
        this.finishDate = new ScheduleStartDate(finishDate);
    }

    updateStartDate(startDate: string): void {
        this.startDate = new ScheduleStartDate(startDate);
    }

    updateAttachments(attachments: string[]): void {
        this.attachments = attachments.map(v => new ScheduleAttachment(v));
    }

}