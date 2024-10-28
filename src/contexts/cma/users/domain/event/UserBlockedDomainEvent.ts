import { DomainEventAttributes } from "../../../../shared/domain/event/DomainEvent";
import { UserDomainEvent } from "./UserDomainEvent";

export class UserBlockedDomainEvent extends UserDomainEvent {
	static eventName = "pnfi.cma.user.blocked";

	constructor(
		public readonly id: string,
		eventId?: string,
		occurredOn?: Date
	) {
		super(UserBlockedDomainEvent.eventName, id, eventId, occurredOn);
	}

	static fromPrimitives(
		aggregateId: string,
		eventId: string,
		occurredOn: Date,
		_attributes: DomainEventAttributes
	): UserBlockedDomainEvent {
		return new UserBlockedDomainEvent(aggregateId, eventId, occurredOn);
	}

	toPrimitives(): DomainEventAttributes {
		return {
			id: this.id
		};
	}
}
