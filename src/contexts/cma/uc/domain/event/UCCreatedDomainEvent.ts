import { DomainEventAttributes } from "../../../../shared/domain/event/DomainEvent";
import { UCDomainEvent } from "./UCDomainEvent";

export class UCCreatedDomainEvent extends UCDomainEvent {
	static eventName = "pnfi.cma.uc.created";
    
	constructor(
		public readonly id: string,
		public readonly name: string,
		eventId?: string,
		occurredOn?: Date
	) {
		super(UCCreatedDomainEvent.eventName, id, eventId, occurredOn);
	}

	static fromPrimitives(
		aggregateId: string,
		eventId: string,
		occurredOn: Date,
		attributes: DomainEventAttributes
	): UCCreatedDomainEvent {
		return new UCCreatedDomainEvent(
			aggregateId,
			attributes.name as string,
			eventId,
			occurredOn
		);
	}

	toPrimitives(): Record<string, unknown> {
		return {
			id: this.id,
			name: this.name
		};
	}
}
