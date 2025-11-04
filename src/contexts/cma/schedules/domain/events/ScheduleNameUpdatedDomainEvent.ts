import { DomainEventAttributes } from "../../../../shared/domain/events/DomainEvent";
import { ScheduleDomainEvent } from "./ScheduleDomainEvent";

export class ScheduleNameUpdatedDomainEvent extends ScheduleDomainEvent {
    static eventName: string = "pnfi.cma.schedule.name.updated";

    constructor(
        public readonly id: string,
        public readonly name: string,
        eventId?: string,
        occurredOn?: Date
    ) {
        super(ScheduleNameUpdatedDomainEvent.eventName, id, eventId, occurredOn);
    }

    static fromPrimitives(
        aggregateId: string,
        eventId: string,
        occurredOn: Date,
        attributes: DomainEventAttributes
    ): ScheduleNameUpdatedDomainEvent {
        return new ScheduleNameUpdatedDomainEvent(aggregateId, attributes.name as string, eventId, occurredOn);
    }

    toPrimitives(): DomainEventAttributes {
        return {
            id: this.id,
            name: this.name
        };
    }
}
