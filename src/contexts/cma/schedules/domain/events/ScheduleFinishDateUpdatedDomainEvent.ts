import { DomainEventAttributes } from "../../../../shared/domain/events/DomainEvent";
import { ScheduleDomainEvent } from "./ScheduleDomainEvent";

export class ScheduleFinishDateUpdatedDomainEvent extends ScheduleDomainEvent {
    static eventName: string = "pnfi.cma.schedule.finishDate.updated";

    constructor(
        public readonly id: string,
        public readonly finishDate: string,
        eventId?: string,
        occurredOn?: Date
    ) {
        super(ScheduleFinishDateUpdatedDomainEvent.eventName, id, eventId, occurredOn);
    }

    static fromPrimitives(
        aggregateId: string,
        eventId: string,
        occurredOn: Date,
        attributes: DomainEventAttributes
    ): ScheduleFinishDateUpdatedDomainEvent {
        return new ScheduleFinishDateUpdatedDomainEvent(
            aggregateId,
            attributes.finishDate as string,
            eventId,
            occurredOn
        );
    }

    toPrimitives(): DomainEventAttributes {
        return {
            id: this.id,
            finishDate: this.finishDate
        };
    }
}
