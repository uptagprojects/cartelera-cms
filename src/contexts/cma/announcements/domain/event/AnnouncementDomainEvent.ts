import { DomainEvent } from "../../../../shared/domain/event/DomainEvent";

export class AnnouncementDomainEvent extends DomainEvent {
    static eventName = "pnfi.cma.announcement.*";

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
