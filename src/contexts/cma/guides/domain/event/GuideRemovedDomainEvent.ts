import { DomainEventAttributes } from "../../../../shared/domain/event/DomainEvent";
import { GuideDomainEvent } from "./GuideDomainEvent";

export class GuideRemovedDomainEvent extends GuideDomainEvent {
    static eventName = "pnfi.cma.guide.removed";

    constructor(
        public readonly id: string,
        public readonly ucId: string,
        eventId?: string,
        occurredOn?: Date
    ) {
        super(GuideRemovedDomainEvent.eventName, id, eventId, occurredOn);
    }

    static fromPrimitives(
        aggregateId: string,
        eventId: string,
        occurredOn: Date,
        _attributes: DomainEventAttributes
    ): GuideRemovedDomainEvent {
        return new GuideRemovedDomainEvent(aggregateId, _attributes.ucId as string, eventId, occurredOn);
    }

    toPrimitives(): DomainEventAttributes {
        return {
            id: this.id,
            ucId: this.ucId
        };
    }
}
