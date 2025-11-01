import { DomainEventAttributes } from "../../../../shared/domain/event/DomainEvent";
import { EventDomainEvent } from "./EventDomainEvent";

export class EventRemovedDomainEvent extends EventDomainEvent {
    static eventName = "pnfi.cma.event.removed";

    constructor(
        public readonly id: string,
        eventId?: string,
        occurredOn?: Date
    ) {
        super(EventRemovedDomainEvent.eventName, id, eventId, occurredOn);
    }

    static fromPrimitives(
        aggregateId: string,
        eventId: string,
        occurredOn: Date,
        _attributes: DomainEventAttributes
    ): EventRemovedDomainEvent {
        return new EventRemovedDomainEvent(aggregateId, eventId, occurredOn);
    }

    toPrimitives(): DomainEventAttributes {
        return {
            id: this.id
        };
    }
}
