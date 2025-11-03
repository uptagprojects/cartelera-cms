import { DomainEventAttributes } from "../../../../shared/domain/events/DomainEvent";
import { EventDomainEvent } from "./EventDomainEvent";

export class EventPublishedDomainEvent extends EventDomainEvent {
    static eventName = "pnfi.cma.event.published";
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly location: string,
        public readonly startDate: string,
        public readonly endDate: string,
        eventId?: string,
        occurredOn?: Date
    ) {
        super(EventPublishedDomainEvent.eventName, id, eventId, occurredOn);
    }

    static fromPrimitives(
        aggregateId: string,
        eventId: string,
        occurredOn: Date,
        attributes: DomainEventAttributes
    ): EventPublishedDomainEvent {
        return new EventPublishedDomainEvent(
            aggregateId,
            attributes.name as string,
            attributes.location as string,
            attributes.startDate as string,
            attributes.endDate as string,
            eventId,
            occurredOn
        );
    }

    toPrimitives(): Record<string, unknown> {
        return {
            id: this.id,
            name: this.name,
            location: this.location,
            startDate: this.startDate.toString(),
            endDate: this.endDate.toString()
        };
    }
}
