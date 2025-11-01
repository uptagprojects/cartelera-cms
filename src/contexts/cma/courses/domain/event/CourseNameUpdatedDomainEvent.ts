import { DomainEventAttributes } from "../../../../shared/domain/event/DomainEvent";
import { CourseDomainEvent } from "./CourseDomainEvent";

export class CourseNameUpdatedDomainEvent extends CourseDomainEvent {
    static eventName: string = "pnfi.cma.course.name.updated";

    constructor(
        public readonly id: string,
        public readonly name: string,
        eventId?: string,
        occurredOn?: Date
    ) {
        super(CourseNameUpdatedDomainEvent.eventName, id, eventId, occurredOn);
    }

    static fromPrimitives(
        aggregateId: string,
        eventId: string,
        occurredOn: Date,
        attributes: DomainEventAttributes
    ): CourseNameUpdatedDomainEvent {
        return new CourseNameUpdatedDomainEvent(aggregateId, attributes.name as string, eventId, occurredOn);
    }

    toPrimitives(): DomainEventAttributes {
        return {
            id: this.id,
            name: this.name
        };
    }
}
