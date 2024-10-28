import { DomainEventAttributes } from "../../../../shared/domain/event/DomainEvent";
import { UserDomainEvent } from "./UserDomainEvent";

export class UserRestoredDomainEvent extends UserDomainEvent {
	static eventName = "pnfi.cma.user.restored";

	constructor(
		public readonly id: string,
		eventId?: string,
		occurredOn?: Date
	) {
		super(UserRestoredDomainEvent.eventName, id, eventId, occurredOn);
	}

	static fromPrimitives(
		aggregateId: string,
		eventId: string,
		occurredOn: Date,
		_attributes: DomainEventAttributes
	): UserRestoredDomainEvent {
		return new UserRestoredDomainEvent(aggregateId, eventId, occurredOn);
	}

	toPrimitives(): DomainEventAttributes {
		return {
			id: this.id
		};
	}
}
