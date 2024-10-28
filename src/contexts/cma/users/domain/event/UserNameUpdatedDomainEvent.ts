import { DomainEventAttributes } from "../../../../shared/domain/event/DomainEvent";
import { UserDomainEvent } from "./UserDomainEvent";

export class UserNameUpdatedDomainEvent extends UserDomainEvent {
	static eventName: string = "pnfi.cma.user.name.updated";

	constructor(
		public readonly id: string,
		public readonly name: string,
		eventId?: string,
		occurredOn?: Date
	) {
		super(UserNameUpdatedDomainEvent.eventName, id, eventId, occurredOn);
	}

	static fromPrimitives(
		aggregateId: string,
		eventId: string,
		occurredOn: Date,
		attributes: DomainEventAttributes
	): UserNameUpdatedDomainEvent {
		return new UserNameUpdatedDomainEvent(
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
