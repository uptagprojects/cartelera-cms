import { DomainEventAttributes } from "../../../../shared/domain/event/DomainEvent";
import { EventDomainEvent } from "./EventDomainEvent";

export class EventNameUpdatedDomainEvent extends EventDomainEvent {
	static eventName: string = "pnfi.cma.event.name.updated";

	constructor(
		public readonly id: string,
		public readonly name: string,
		eventId?: string,
		occurredOn?: Date
	) {
		super(EventNameUpdatedDomainEvent.eventName, id, eventId, occurredOn);
	}

	static fromPrimitives(
		aggregateId: string,
		eventId: string,
		occurredOn: Date,
		attributes: DomainEventAttributes
	): EventNameUpdatedDomainEvent {
		return new EventNameUpdatedDomainEvent(
			aggregateId,
			attributes.name as string,
			eventId,
			occurredOn
		);
	}

	toPrimitives(): DomainEventAttributes {
		return {
			id: this.id,
			name: this.name
		};
	}
}
