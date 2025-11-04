import { DomainEventAttributes } from "../../../../shared/domain/events/DomainEvent";
import { AnnouncementDomainEvent } from "./AnnouncementDomainEvent";

export class AnnouncementTitleUpdatedDomainEvent extends AnnouncementDomainEvent {
    static eventName: string = "pnfi.cma.announcement.title.updated";

    constructor(
        public readonly id: string,
        public readonly title: string,
        eventId?: string,
        occurredOn?: Date
    ) {
        super(AnnouncementTitleUpdatedDomainEvent.eventName, id, eventId, occurredOn);
    }

    static fromPrimitives(
        aggregateId: string,
        eventId: string,
        occurredOn: Date,
        attributes: DomainEventAttributes
    ): AnnouncementTitleUpdatedDomainEvent {
        return new AnnouncementTitleUpdatedDomainEvent(aggregateId, attributes.title as string, eventId, occurredOn);
    }

    toPrimitives(): DomainEventAttributes {
        return {
            id: this.id,
            title: this.title
        };
    }
}
