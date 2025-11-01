import { DomainEventAttributes } from "../../../../shared/domain/event/DomainEvent";
import { AnnouncementDomainEvent } from "./AnnouncementDomainEvent";

export class AnnouncementRestoredDomainEvent extends AnnouncementDomainEvent {
    static eventName: string = "pnfi.cma.announcement.restored";

    constructor(
        public readonly id: string,
        eventId?: string,
        occurredOn?: Date
    ) {
        super(AnnouncementRestoredDomainEvent.eventName, id, eventId, occurredOn);
    }

    static fromPrimitives(
        aggregateId: string,
        eventId: string,
        occurredOn: Date,
        _: DomainEventAttributes
    ): AnnouncementRestoredDomainEvent {
        return new AnnouncementRestoredDomainEvent(aggregateId, eventId, occurredOn);
    }

    toPrimitives(): DomainEventAttributes {
        return {
            id: this.id
        };
    }
}
