import { DomainEventAttributes } from "../../../../shared/domain/event/DomainEvent";
import { ScheduleDomainEvent } from "./ScheduleDomainEvent";

export class SchedulePublishedDomainEvent extends ScheduleDomainEvent {
    static eventName = "pnfi.cma.schedule.published";

    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly startDate: string,
        public readonly finishDate: string,
        eventId?: string,
        occurredOn?: Date
    ) {
        super(SchedulePublishedDomainEvent.eventName, id, eventId, occurredOn);
    }

    static fromPrimitives(
        aggregateId: string,
        eventId: string,
        occurredOn: Date,
        attributes: DomainEventAttributes
    ): SchedulePublishedDomainEvent {
        return new SchedulePublishedDomainEvent(
            aggregateId,
            attributes.name as string,
            attributes.startDate as string,
            attributes.finishDate as string,
            eventId,
            occurredOn
        );
    }

    toPrimitives(): DomainEventAttributes {
        return {
            id: this.id,
            name: this.name,
            startDate: this.startDate,
            finishDate: this.finishDate
        };
    }
}
