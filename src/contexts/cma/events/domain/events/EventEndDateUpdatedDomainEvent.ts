import { DomainEventAttributes } from "../../../../shared/domain/events/DomainEvent";
import { EventDomainEvent } from "./EventDomainEvent";

export class EventEndDateUpdatedDomainEvent extends EventDomainEvent {
    static eventName: string = "pnfi.cma.event.endDate.updated";

    constructor(
        public readonly id: string,
        public readonly endDate: string,
        eventId?: string,
        occurredOn?: Date
    ) {
        super(EventEndDateUpdatedDomainEvent.eventName, id, eventId, occurredOn);
    }

    static fromPrimitives(
        aggregateId: string,
        eventId: string,
        occurredOn: Date,
        attributes: DomainEventAttributes
    ): EventEndDateUpdatedDomainEvent {
        return new EventEndDateUpdatedDomainEvent(aggregateId, attributes.endDate as string, eventId, occurredOn);
    }

    toPrimitives(): DomainEventAttributes {
        return {
            id: this.id,
            endDate: this.endDate
        };
    }
}
