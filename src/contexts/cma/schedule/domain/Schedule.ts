import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { ScheduleCreatedDomainEvent } from "./event/ScheduleCreatedDomainEvent";
import { ScheduleEndDateUpdatedDomainEvent } from "./event/ScheduleEndDateUpdatedDomainEvent";
import { ScheduleStartDateUpdatedDomainEvent } from "./event/ScheduleStartDateUpdatedDomainEvent";
import { ScheduleEndDate } from "./ScheduleEndDate";
import { ScheduleId } from "./ScheduleId";
import { ScheduleStartDate } from "./ScheduleStartDate";

export interface SchedulePrimitives {
    id: string;
    startDate: string;
    endDate: string;
}

export class Schedule extends AggregateRoot {
    constructor(
        private readonly id: ScheduleId,
        private startDate: ScheduleStartDate,
        private endDate: ScheduleEndDate
    ) {
        super();
    }

    static create(id: string, startDate: string, endDate: string): Schedule {
        const schedule = new Schedule(
            new ScheduleId(id),
            new ScheduleStartDate(startDate),
            new ScheduleEndDate(endDate)
        );

        schedule.record(new ScheduleCreatedDomainEvent(id, startDate, endDate));

        return schedule;
    }

    static fromPrimitives(primitives: SchedulePrimitives): Schedule {
        return new Schedule(
            new ScheduleId(primitives.id),
            new ScheduleStartDate(primitives.startDate),
            new ScheduleEndDate(primitives.endDate)
        )
    }

    getId(): ScheduleId {
        return this.id;
    }

    toPrimitives(): SchedulePrimitives {
        return {
            id: this.id.value,
            startDate: this.startDate.value.toString(),
            endDate: this.endDate.value.toString()
        }
    }

    updateStartDate(startDate: string): void {
        this.startDate = new ScheduleStartDate(startDate);
        this.record(new ScheduleStartDateUpdatedDomainEvent(this.id.value, startDate));
    }

    updateEndDate(endDate: string): void {
        this.endDate = new ScheduleEndDate(endDate);
        this.record(new ScheduleEndDateUpdatedDomainEvent(this.id.value, endDate));
    }
}