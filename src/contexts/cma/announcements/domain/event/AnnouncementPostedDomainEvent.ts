import { DomainEventAttributes } from "../../../../shared/domain/event/DomainEvent";
import { AnnouncementDomainEvent } from "./AnnouncementDomainEvent";

export class AnnouncementPostedDomainEvent extends AnnouncementDomainEvent {
    static eventName = "pnfi.cma.announcement.posted";
    constructor(
        public readonly id: string,
        public readonly title: string,
        public readonly content: string,
        public readonly publishDate: string,
        public readonly type: string,
        eventId?: string,
        occurredOn?: Date
    ) {
        super(AnnouncementPostedDomainEvent.eventName, id, eventId, occurredOn);
    }

    static fromPrimitives(
        aggregateId: string,
        eventId: string,
        occurredOn: Date,
        attributes: DomainEventAttributes
    ): AnnouncementPostedDomainEvent {
        return new AnnouncementPostedDomainEvent(
            aggregateId,
            attributes.title as string,
            attributes.content as string,
            attributes.publishDate as string,
            attributes.type as string,
            eventId,
            occurredOn
        );
    }

    toPrimitives(): Record<string, unknown> {
        return {
            id: this.id,
            title: this.title,
            content: this.content,
            publishDate: this.publishDate,
            type: this.type
        };
    }
}
