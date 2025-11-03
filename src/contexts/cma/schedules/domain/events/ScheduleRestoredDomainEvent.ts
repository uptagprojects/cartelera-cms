import { DomainEventAttributes } from "../../../../shared/domain/events/DomainEvent";
import { ScheduleDomainEvent } from "./ScheduleDomainEvent";

export class ScheduleRestoredDomainEvent extends ScheduleDomainEvent {
    static eventName = "pnfi.cma.schedule.restored";

    constructor(
        public readonly id: string,
        eventId?: string,
        occurredOn?: Date
    ) {
        super(ScheduleRestoredDomainEvent.eventName, id, eventId, occurredOn);
    }

    static fromPrimitives(
        aggregateId: string,
        eventId: string,
        occurredOn: Date,
        _attributes: DomainEventAttributes
    ): ScheduleRestoredDomainEvent {
        return new ScheduleRestoredDomainEvent(aggregateId, eventId, occurredOn);
    }

    toPrimitives(): DomainEventAttributes {
        return {
            id: this.id
        };
    }
}
