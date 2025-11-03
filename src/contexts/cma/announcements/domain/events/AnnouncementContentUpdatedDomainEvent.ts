import { DomainEventAttributes } from "../../../../shared/domain/events/DomainEvent";
import { AnnouncementDomainEvent } from "./AnnouncementDomainEvent";

export class AnnouncementContentUpdatedDomainEvent extends AnnouncementDomainEvent {
    static eventName: string = "pnfi.cma.announcement.content.updated";

    constructor(
        public readonly id: string,
        public readonly content: string,
        eventId?: string,
        occurredOn?: Date
    ) {
        super(AnnouncementContentUpdatedDomainEvent.eventName, id, eventId, occurredOn);
    }

    static fromPrimitives(
        aggregateId: string,
        eventId: string,
        occurredOn: Date,
        attributes: DomainEventAttributes
    ): AnnouncementContentUpdatedDomainEvent {
        return new AnnouncementContentUpdatedDomainEvent(
            aggregateId,
            attributes.content as string,
            eventId,
            occurredOn
        );
    }

    toPrimitives(): DomainEventAttributes {
        return {
            id: this.id,
            content: this.content
        };
    }
}
