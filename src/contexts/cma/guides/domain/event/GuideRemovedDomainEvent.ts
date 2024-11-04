import { DomainEventAttributes } from "../../../../shared/domain/event/DomainEvent";
import { GuideDomainEvent } from "./GuideDomainEvent";

export class GuideRemovedDomainEvent extends GuideDomainEvent {
	static eventName = "pnfi.cma.guide.removed";

	constructor(
		public readonly id: string,
		eventId?: string,
		occurredOn?: Date
	) {
		super(GuideRemovedDomainEvent.eventName, id, eventId, occurredOn);
	}

	static fromPrimitives(
		aggregateId: string,
		eventId: string,
		occurredOn: Date,
		_attributes: DomainEventAttributes
	): GuideRemovedDomainEvent {
		return new GuideRemovedDomainEvent(aggregateId, eventId, occurredOn);
	}

	toPrimitives(): DomainEventAttributes {
		return {
			id: this.id
		};
	}
}
