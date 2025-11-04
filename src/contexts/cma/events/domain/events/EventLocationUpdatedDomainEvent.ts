import { DomainEventAttributes } from "../../../../shared/domain/events/DomainEvent";
import { EventDomainEvent } from "./EventDomainEvent";

export class EventLocationUpdatedDomainEvent extends EventDomainEvent {
    static eventName: string = "pnfi.cma.event.location.updated";

    constructor(
        public readonly id: string,
        public readonly location: string,
        eventId?: string,
        occurredOn?: Date
    ) {
        super(EventLocationUpdatedDomainEvent.eventName, id, eventId, occurredOn);
    }

    static fromPrimitives(
        aggregateId: string,
        eventId: string,
        occurredOn: Date,
        attributes: DomainEventAttributes
    ): EventLocationUpdatedDomainEvent {
        return new EventLocationUpdatedDomainEvent(aggregateId, attributes.location as string, eventId, occurredOn);
    }

    toPrimitives(): DomainEventAttributes {
        return {
            id: this.id,
            location: this.location
        };
    }
}
