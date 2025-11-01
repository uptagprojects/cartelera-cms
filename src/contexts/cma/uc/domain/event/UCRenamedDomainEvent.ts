import { DomainEventAttributes } from "../../../../shared/domain/event/DomainEvent";
import { UCDomainEvent } from "./UCDomainEvent";

export class UCRenamedDomainEvent extends UCDomainEvent {
    static eventName = "pnfi.cma.uc.renamed";

    constructor(
        public readonly id: string,
        public readonly name: string,
        eventId?: string,
        occurredOn?: Date
    ) {
        super(UCRenamedDomainEvent.eventName, id, eventId, occurredOn);
    }

    static fromPrimitives(
        aggregateId: string,
        eventId: string,
        occurredOn: Date,
        attributes: DomainEventAttributes
    ): UCRenamedDomainEvent {
        return new UCRenamedDomainEvent(aggregateId, attributes.name as string, eventId, occurredOn);
    }

    toPrimitives(): Record<string, unknown> {
        return {
            id: this.id,
            name: this.name
        };
    }
}
