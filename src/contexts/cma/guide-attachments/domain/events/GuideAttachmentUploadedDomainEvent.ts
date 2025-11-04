import { DomainEventAttributes } from "../../../../shared/domain/events/DomainEvent";
import { GuideAttachmentDomainEvent } from "./GuideAttachmentDomainEvent";

export class GuideAttachmentUploadedDomainEvent extends GuideAttachmentDomainEvent {
    static eventName = "pnfi.cma.guide_attachment.uploaded";

    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly guideId: string,
        public readonly url: string,
        public readonly size: number,
        public readonly mimeType: string,
        public readonly storagePath: string,
        eventId?: string,
        occurredOn?: Date
    ) {
        super(GuideAttachmentUploadedDomainEvent.eventName, id, eventId, occurredOn);
    }

    static fromPrimitives(
        aggregateId: string,
        eventId: string,
        occurredOn: Date,
        attributes: DomainEventAttributes
    ): GuideAttachmentUploadedDomainEvent {
        return new GuideAttachmentUploadedDomainEvent(
            aggregateId,
            attributes.name as string,
            attributes.guideId as string,
            attributes.url as string,
            attributes.size as number,
            attributes.mimeType as string,
            attributes.storagePath as string,
            eventId,
            occurredOn
        );
    }

    toPrimitives(): Record<string, unknown> {
        return {
            id: this.id,
            name: this.name,
            guideId: this.guideId,
            url: this.url,
            size: this.size,
            mimeType: this.mimeType,
            storagePath: this.storagePath
        };
    }
}
