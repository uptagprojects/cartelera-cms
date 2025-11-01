import { DomainEventAttributes } from "../../../../shared/domain/event/DomainEvent";
import { UCDomainEvent } from "./UCDomainEvent";

export class UCRemovedDomainEvent extends UCDomainEvent {
    static eventName = "pnfi.cma.uc.removed";

    constructor(
        public readonly id: string,
        eventId?: string,
        occurredOn?: Date
    ) {
        super(UCRemovedDomainEvent.eventName, id, eventId, occurredOn);
    }

    static fromPrimitives(
        aggregateId: string,
        eventId: string,
        occurredOn: Date,
        _attributes: DomainEventAttributes
    ): UCRemovedDomainEvent {
        return new UCRemovedDomainEvent(aggregateId, eventId, occurredOn);
    }

    toPrimitives(): DomainEventAttributes {
        return {
            id: this.id
        };
    }
}
