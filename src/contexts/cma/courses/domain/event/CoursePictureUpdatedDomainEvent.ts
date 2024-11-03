import { DomainEventAttributes } from "../../../../shared/domain/event/DomainEvent";
import { CourseDomainEvent } from "./CourseDomainEvent";

export class CoursePictureUpdatedDomainEvent extends CourseDomainEvent {
	static eventName: string = "pnfi.cma.course.picture.updated";

	constructor(
		public readonly id: string,
		public readonly picture: string,
		eventId?: string,
		occurredOn?: Date
	) {
		super(CoursePictureUpdatedDomainEvent.eventName, id, eventId, occurredOn);
	}

	static fromPrimitives(
		aggregateId: string,
		eventId: string,
		occurredOn: Date,
		attributes: DomainEventAttributes
	): CoursePictureUpdatedDomainEvent {
		return new CoursePictureUpdatedDomainEvent(
			aggregateId,
			attributes.picture as string,
			eventId,
			occurredOn
		);
	}

	toPrimitives(): DomainEventAttributes {
		return {
			id: this.id,
			picture: this.picture
		};
	}
}
