import { DomainEventAttributes } from "../../../../shared/domain/event/DomainEvent";
import { CourseDomainEvent } from "./CourseDomainEvent";

export class CourseAbstractUpdatedDomainEvent extends CourseDomainEvent {
	static eventName: string = "pnfi.cma.course.abstract.updated";

	constructor(
		public readonly id: string,
		public readonly abstract: string,
		eventId?: string,
		occurredOn?: Date
	) {
		super(CourseAbstractUpdatedDomainEvent.eventName, id, eventId, occurredOn);
	}

	static fromPrimitives(
		aggregateId: string,
		eventId: string,
		occurredOn: Date,
		attributes: DomainEventAttributes
	): CourseAbstractUpdatedDomainEvent {
		return new CourseAbstractUpdatedDomainEvent(
			aggregateId,
			attributes.abstract as string,
			eventId,
			occurredOn
		);
	}

	toPrimitives(): DomainEventAttributes {
		return {
			id: this.id,
			abstract: this.abstract
		};
	}
}
