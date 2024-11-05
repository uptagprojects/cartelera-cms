import { DomainEventAttributes } from "../../../../shared/domain/event/DomainEvent";
import { GuideDomainEvent } from "./GuideDomainEvent";

export class GuideContentUpdatedDomainEvent extends GuideDomainEvent {
	static eventName: string = "pnfi.cma.guide.content.updated";

	constructor(
		public readonly id: string,
		public readonly content: string,
		eventId?: string,
		occurredOn?: Date
	) {
		super(GuideContentUpdatedDomainEvent.eventName, id, eventId, occurredOn);
	}

	static fromPrimitives(
		aggregateId: string,
		eventId: string,
		occurredOn: Date,
		attributes: DomainEventAttributes
	): GuideContentUpdatedDomainEvent {
		return new GuideContentUpdatedDomainEvent(
			aggregateId,
			attributes.content as string,
			eventId,
			occurredOn
		);
	}

	toPrimitives(): DomainEventAttributes {
		return {
			id: this.id,
			content: this.content
		};
	}
}
