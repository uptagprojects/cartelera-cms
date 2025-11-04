import { DomainEvent } from "../../../../shared/domain/events/DomainEvent";

export class UCDomainEvent extends DomainEvent {
    static eventName = "pnfi.cma.uc.*";

    constructor(
        eventName: string,
        public readonly id: string,
        eventId?: string,
        occurredOn?: Date
    ) {
        super(eventName, id, eventId, occurredOn);
    }

    toPrimitives(): Record<string, unknown> {
        return {
            id: this.id
        };
    }
}
