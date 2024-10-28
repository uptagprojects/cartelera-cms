import { DomainEventAttributes } from "../../../../shared/domain/event/DomainEvent";
import { AuthDomainEvent } from "./AuthDomainEvent";

export class AuthPasswordUpdatedDomainEvent extends AuthDomainEvent {
	static eventName: string = "pnfi.cma.auth.password.updated";

	constructor(
		public readonly id: string,
		eventId?: string,
		occurredOn?: Date
	) {
		super(AuthPasswordUpdatedDomainEvent.eventName, id, eventId, occurredOn);
	}

	static fromPrimitives(
		aggregateId: string,
		eventId: string,
		occurredOn: Date,
		_attributes: DomainEventAttributes
	): AuthPasswordUpdatedDomainEvent {
		return new AuthPasswordUpdatedDomainEvent(aggregateId, eventId, occurredOn);
	}

	private static generateRandomPassword(): string {
		return crypto.getRandomValues(new BigUint64Array(1))[0].toString(36);
	}

	toPrimitives(): DomainEventAttributes {
		return {
			id: this.id
		};
	}
}
