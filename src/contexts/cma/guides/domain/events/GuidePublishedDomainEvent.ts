import { DomainEventAttributes } from "../../../../shared/domain/events/DomainEvent";
import { GuideDomainEvent } from "./GuideDomainEvent";

export class GuidePublishedDomainEvent extends GuideDomainEvent {
    static eventName = "pnfi.cma.guide.published";

    constructor(
        public readonly id: string,
        public readonly title: string,
        public readonly content: string,
        public readonly ucId: string,
        public readonly authorId: string,
        eventId?: string,
        occurredOn?: Date
    ) {
        super(GuidePublishedDomainEvent.eventName, id, eventId, occurredOn);
    }

    static fromPrimitives(
        aggregateId: string,
        eventId: string,
        occurredOn: Date,
        attributes: DomainEventAttributes
    ): GuidePublishedDomainEvent {
        return new GuidePublishedDomainEvent(
            aggregateId,
            attributes.title as string,
            attributes.content as string,
            attributes.ucId as string,
            attributes.authorId as string,
            eventId,
            occurredOn
        );
    }

    toPrimitives(): DomainEventAttributes {
        return {
            id: this.id,
            title: this.title,
            content: this.content,
            ucId: this.ucId,
            authorId: this.authorId
        };
    }
}
