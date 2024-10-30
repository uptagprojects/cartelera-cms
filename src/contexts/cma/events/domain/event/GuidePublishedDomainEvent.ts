import { DomainEventAttributes } from "../../../../shared/domain/event/DomainEvent";
import { GuideDomainEvent } from "./EventDomainEvent";

export class GuidePublishedDomainEvent extends GuideDomainEvent {
	static eventName = "pnfi.cma.guide.published";

	constructor(
		public readonly id: string,
		eventId?: string,
		occurredOn?: Date
	) {
		super(GuidePublishedDomainEvent.eventName, id, eventId, occurredOn);
	}

	static fromPrimitives(
		aggregateId: string,
		eventId: string,
		occurredOn: Date,
		_attributes: DomainEventAttributes
	): GuidePublishedDomainEvent {
		return new GuidePublishedDomainEvent(aggregateId, eventId, occurredOn);
	}

	toPrimitives(): DomainEventAttributes {
		return {
			id: this.id
		};
	}
}
