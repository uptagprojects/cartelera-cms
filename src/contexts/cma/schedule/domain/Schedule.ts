import { AggregateRoot } from "../../../shared/domain/AggregateRoot"
import { ScheduleArchivedDomainEvent } from "./event/ScheduleArchivedDomainEvent";
import { SchedulePostedDomainEvent } from "./event/SchedulePostedDomainEvent";
import { ScheduleRestoredDomainEvent } from "./event/ScheduleRestoredDomainEvent";
import { ScheduleFinishDate } from "./ScheduleFinishDate";
import { ScheduleId } from "./ScheduleId";
import { ScheduleName } from "./ScheduleName";
import { ScheduleStartDate } from "./ScheduleStartDate";
import { ScheduleStatus } from "./ScheduleStatus";


export interface SchedulePrimitives {
    id: string;
    name: string;
    startDate: string;
    finishDate: string;
    status: string;
}

export class Schedule extends AggregateRoot {
    constructor(
        private readonly id: ScheduleId,
        private name: ScheduleName,
        private startDate: ScheduleStartDate,
        private finishDate: ScheduleFinishDate,
        private status: ScheduleStatus
    ) {
        super();
    }

    static create(id: string, name: string, startDate: string, finishDate: string): Schedule {
        const defaultScheduleStatus = ScheduleStatus.DRAFT;
        const schedule = new Schedule(
            new ScheduleId(id),
            new ScheduleName(name),
            new ScheduleStartDate(startDate),
            new ScheduleFinishDate(finishDate),
            defaultScheduleStatus
        );

        schedule.record(new SchedulePostedDomainEvent(id, name, startDate, finishDate, defaultScheduleStatus));

        return schedule;
    }

    static fromPrimitives(primitives: SchedulePrimitives): Schedule {
        return new Schedule(
            new ScheduleId(primitives.id),
            new ScheduleName(primitives.name),
            new ScheduleStartDate(primitives.startDate),
            new ScheduleFinishDate(primitives.finishDate),
            primitives.status as ScheduleStatus
        );
    }

    toPrimitives(): SchedulePrimitives {
        return {
            id: this.id.value,
            name: this.name.value,
            startDate: this.startDate.value.toISOString(),
            finishDate: this.finishDate.value.toISOString(),
            status: this.status
        };
    }

    getId(): ScheduleId {
        return this.id;
    }

    publish(): void {
        this.status = ScheduleStatus.PUBLISHED;
        this.record(
            new SchedulePostedDomainEvent(
                this.id.value,
                this.name.value,
                this.startDate.value.toISOString(),
                this.finishDate.value.toISOString(),
                this.status
            )
        );
    }

    archive(): void {
        this.status = ScheduleStatus.ARCHIVED;
        this.record(new ScheduleArchivedDomainEvent(this.id.value));
    }

    restore(): void {
        this.status = ScheduleStatus.PUBLISHED;
        this.record(new ScheduleRestoredDomainEvent(this.id.value));
    }

    updateName(name: string): void {
        this.name = new ScheduleName(name);
    }

    updateStartDate(startDate: string): void {
        this.startDate = new ScheduleStartDate(startDate);
    }

    updateFinishDate(finishDate: string): void {
        this.finishDate = new ScheduleFinishDate(finishDate);
    }

}