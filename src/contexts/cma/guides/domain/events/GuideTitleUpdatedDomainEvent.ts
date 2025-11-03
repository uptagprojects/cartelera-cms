import { DomainEventAttributes } from "../../../../shared/domain/events/DomainEvent";
import { GuideDomainEvent } from "./GuideDomainEvent";

export class GuideTitleUpdatedDomainEvent extends GuideDomainEvent {
    static eventName: string = "pnfi.cma.guide.title.updated";

    constructor(
        public readonly id: string,
        public readonly title: string,
        eventId?: string,
        occurredOn?: Date
    ) {
        super(GuideTitleUpdatedDomainEvent.eventName, id, eventId, occurredOn);
    }

    static fromPrimitives(
        aggregateId: string,
        eventId: string,
        occurredOn: Date,
        attributes: DomainEventAttributes
    ): GuideTitleUpdatedDomainEvent {
        return new GuideTitleUpdatedDomainEvent(aggregateId, attributes.title as string, eventId, occurredOn);
    }

    toPrimitives(): DomainEventAttributes {
        return {
            id: this.id,
            title: this.title
        };
    }
}
