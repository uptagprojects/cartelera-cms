import { DomainEventAttributes } from "../../../../shared/domain/event/DomainEvent";
import { ScheduleAttachmentDomainEvent } from "./ScheduleAttachmentDomainEvent";

export class ScheduleAttachmentRemovedDomainEvent extends ScheduleAttachmentDomainEvent {
    static eventName = "pnfi.cma.schedule_attachment.removed";

    constructor(
        public readonly id: string,
        public readonly storagePath: string,
        eventId?: string,
        occurredOn?: Date
    ) {
        super(ScheduleAttachmentRemovedDomainEvent.eventName, id, eventId, occurredOn);
    }

    static fromPrimitives(
        aggregateId: string,
        eventId: string,
        occurredOn: Date,
        attributes: DomainEventAttributes
    ): ScheduleAttachmentRemovedDomainEvent {
        return new ScheduleAttachmentRemovedDomainEvent(
            aggregateId,
            attributes.storagePath as string,
            eventId,
            occurredOn
        );
    }

    toPrimitives(): DomainEventAttributes {
        return {
            id: this.id,
            storagePath: this.storagePath
        };
    }
}
