import { DomainEventAttributes } from "../../../../shared/domain/event/DomainEvent";
import { EventDomainEvent } from "./EventDomainEvent";

export class EventPostedDomainEvent extends EventDomainEvent {
	static eventName = "pnfi.cma.event.posted";
	constructor(
		public readonly id: string,
		public readonly name: string,
		public readonly location: string,
		public readonly startDate: string,
        public readonly endDate: string,
		eventId?: string,
		occurredOn?: Date
	) {
		super(EventPostedDomainEvent.eventName, id, eventId, occurredOn);
	}

	static fromPrimitives(
		aggregateId: string,
		eventId: string,
		occurredOn: Date,
		attributes: DomainEventAttributes
	): EventPostedDomainEvent {
		return new EventPostedDomainEvent(
			aggregateId,
			attributes.name as string,
            attributes.location as string,
            attributes.startDate as string,
            attributes.endDate as string,
			eventId,
			occurredOn
		);
	}

	toPrimitives(): Record<string, unknown> {
		return {
			id: this.id,
			name: this.name,
            location: this.location,
            startDate: this.startDate.toString(),
            endDate: this.endDate.toString(),
		};
	}
}
