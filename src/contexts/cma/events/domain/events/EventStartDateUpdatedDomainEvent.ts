import { DomainEventAttributes } from "../../../../shared/domain/events/DomainEvent";
import { EventDomainEvent } from "./EventDomainEvent";

export class EventStartDateUpdatedDomainEvent extends EventDomainEvent {
    static eventName: string = "pnfi.cma.event.startDate.updated";

    constructor(
        public readonly id: string,
        public readonly startDate: string,
        eventId?: string,
        occurredOn?: Date
    ) {
        super(EventStartDateUpdatedDomainEvent.eventName, id, eventId, occurredOn);
    }

    static fromPrimitives(
        aggregateId: string,
        eventId: string,
        occurredOn: Date,
        attributes: DomainEventAttributes
    ): EventStartDateUpdatedDomainEvent {
        return new EventStartDateUpdatedDomainEvent(aggregateId, attributes.startDate as string, eventId, occurredOn);
    }

    toPrimitives(): DomainEventAttributes {
        return {
            id: this.id,
            startDate: this.startDate
        };
    }
}
