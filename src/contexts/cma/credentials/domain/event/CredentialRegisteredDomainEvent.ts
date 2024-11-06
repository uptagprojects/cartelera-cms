import { DomainEventAttributes } from "../../../../shared/domain/event/DomainEvent";
import { CredentialDomainEvent } from "./CredentialDomainEvent";

export class CredentialRegisteredDomainEvent extends CredentialDomainEvent {
	static eventName = "pnfi.cma.credential.registered";

	constructor(
		public readonly id: string,
		eventId?: string,
		occurredOn?: Date
	) {
		super(CredentialRegisteredDomainEvent.eventName, id, eventId, occurredOn);
	}

	static fromPrimitives(
		aggregateId: string,
		eventId: string,
		occurredOn: Date,
		_attributes: DomainEventAttributes
	): CredentialRegisteredDomainEvent {
		return new CredentialRegisteredDomainEvent(aggregateId, eventId, occurredOn);
	}

	toPrimitives(): DomainEventAttributes {
		return {
			id: this.id
		};
	}
}
