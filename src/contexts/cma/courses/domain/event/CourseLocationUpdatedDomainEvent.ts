import { DomainEventAttributes } from "../../../../shared/domain/event/DomainEvent";
import { CourseDomainEvent } from "./CourseDomainEvent";

export class CourseLocationUpdatedDomainEvent extends CourseDomainEvent {
	static eventName: string = "pnfi.cma.course.location.updated";

	constructor(
		public readonly id: string,
		public readonly location: string,
		eventId?: string,
		occurredOn?: Date
	) {
		super(CourseLocationUpdatedDomainEvent.eventName, id, eventId, occurredOn);
	}

	static fromPrimitives(
		aggregateId: string,
		eventId: string,
		occurredOn: Date,
		attributes: DomainEventAttributes
	): CourseLocationUpdatedDomainEvent {
		return new CourseLocationUpdatedDomainEvent(
			aggregateId,
			attributes.location as string,
			eventId,
			occurredOn
		);
	}

	toPrimitives(): DomainEventAttributes {
		return {
			id: this.id,
			location: this.location
		};
	}
}
