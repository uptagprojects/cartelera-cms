import { DomainEventAttributes } from "../../../../shared/domain/event/DomainEvent";
import { CourseDomainEvent } from "./CourseDomainEvent";

export class CoursePriceUpdatedDomainEvent extends CourseDomainEvent {
	static eventName: string = "pnfi.cma.course.price.updated";

	constructor(
		public readonly id: string,
		public readonly price: number,
		eventId?: string,
		occurredOn?: Date
	) {
		super(CoursePriceUpdatedDomainEvent.eventName, id, eventId, occurredOn);
	}

	static fromPrimitives(
		aggregateId: string,
		eventId: string,
		occurredOn: Date,
		attributes: DomainEventAttributes
	): CoursePriceUpdatedDomainEvent {
		return new CoursePriceUpdatedDomainEvent(
			aggregateId,
			attributes.price as number,
			eventId,
			occurredOn
		);
	}

	toPrimitives(): DomainEventAttributes {
		return {
			id: this.id,
			price: this.price
		};
	}
}
