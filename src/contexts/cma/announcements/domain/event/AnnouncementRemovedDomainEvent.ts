import { DomainEventAttributes } from "../../../../shared/domain/event/DomainEvent";
import { AnnouncementDomainEvent } from "./AnnouncementDomainEvent";

export class AnnouncementRemovedDomainEvent extends AnnouncementDomainEvent {
    static eventName: string = "pnfi.cma.announcement.removed";

    constructor(
        public readonly id: string,
        eventId?: string,
        occurredOn?: Date
    ) {
        super(AnnouncementRemovedDomainEvent.eventName, id, eventId, occurredOn);
    }

    static fromPrimitives(
        aggregateId: string,
        eventId: string,
        occurredOn: Date,
        _: DomainEventAttributes
    ): AnnouncementRemovedDomainEvent {
        return new AnnouncementRemovedDomainEvent(aggregateId, eventId, occurredOn);
    }

    toPrimitives(): DomainEventAttributes {
        return {
            id: this.id
        };
    }
}
