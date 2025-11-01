import { DomainEventAttributes } from "../../../../shared/domain/event/DomainEvent";
import { ScheduleDomainEvent } from "./ScheduleDomainEvent";

export class SchedulePostedDomainEvent extends ScheduleDomainEvent {
    static eventName = "pnfi.cma.schedule.posted";
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly startDate: string,
        public readonly finishDate: string,
        public readonly status: string,
        eventId?: string,
        occurredOn?: Date
    ) {
        super(SchedulePostedDomainEvent.eventName, id, eventId, occurredOn);
    }

    static fromPrimitives(
        aggregateId: string,
        eventId: string,
        occurredOn: Date,
        attributes: DomainEventAttributes
    ): SchedulePostedDomainEvent {
        return new SchedulePostedDomainEvent(
            aggregateId,
            attributes.name as string,
            attributes.startDate as string,
            attributes.finishDate as string,
            attributes.status as string,
            eventId,
            occurredOn
        );
    }

    toPrimitives(): Record<string, unknown> {
        return {
            id: this.id,
            name: this.name,
            startDate: this.startDate,
            finishDate: this.finishDate,
            status: this.status
        };
    }
}
