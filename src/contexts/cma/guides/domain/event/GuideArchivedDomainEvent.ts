import { DomainEventAttributes } from "../../../../shared/domain/event/DomainEvent";
import { GuideDomainEvent } from "./GuideDomainEvent";

export class GuideArchivedDomainEvent extends GuideDomainEvent {
    static eventName = "pnfi.cma.guide.archived";

    constructor(
        public readonly id: string,
        public readonly ucId: string,
        eventId?: string,
        occurredOn?: Date
    ) {
        super(GuideArchivedDomainEvent.eventName, id, eventId, occurredOn);
    }

    static fromPrimitives(
        aggregateId: string,
        eventId: string,
        occurredOn: Date,
        _attributes: DomainEventAttributes
    ): GuideArchivedDomainEvent {
        return new GuideArchivedDomainEvent(aggregateId, _attributes.ucId as string, eventId, occurredOn);
    }

    toPrimitives(): DomainEventAttributes {
        return {
            id: this.id,
            ucId: this.ucId
        };
    }
}
