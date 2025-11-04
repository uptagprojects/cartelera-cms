import { DomainEventAttributes } from "../../../../shared/domain/events/DomainEvent";
import { CourseDurationPrimitives } from "../CourseDuration/CourseDuration";
import { CourseInstructorPrimitives } from "../CourseInstructor/CourseInstructor";
import { CourseDomainEvent } from "./CourseDomainEvent";

export class CoursePublishedDomainEvent extends CourseDomainEvent {
    static eventName = "pnfi.cma.course.published";
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly abstract: string,
        public readonly picture: string,
        public readonly instructor: CourseInstructorPrimitives,
        public readonly location: string,
        public readonly duration: CourseDurationPrimitives,
        public readonly price: number,
        public readonly creation: string,
        public readonly lastUpdate: string,
        eventId?: string,
        occurredOn?: Date
    ) {
        super(CoursePublishedDomainEvent.eventName, id, eventId, occurredOn);
    }

    static fromPrimitives(
        aggregateId: string,
        eventId: string,
        occurredOn: Date,
        attributes: DomainEventAttributes
    ): CoursePublishedDomainEvent {
        return new CoursePublishedDomainEvent(
            aggregateId,
            attributes.name as string,
            attributes.abstract as string,
            attributes.picture as string,
            attributes.instructor as CourseInstructorPrimitives,
            attributes.location as string,
            attributes.duration as CourseDurationPrimitives,
            attributes.price as number,
            attributes.creation as string,
            attributes.lastUpdate as string,
            eventId,
            occurredOn
        );
    }

    toPrimitives(): Record<string, unknown> {
        return {
            id: this.id,
            name: this.name,
            abstract: this.abstract,
            picture: this.picture,
            instructor: this.instructor,
            location: this.location,
            duration: this.duration,
            price: this.price,
            creation: this.creation,
            lastUpdate: this.lastUpdate
        };
    }
}
