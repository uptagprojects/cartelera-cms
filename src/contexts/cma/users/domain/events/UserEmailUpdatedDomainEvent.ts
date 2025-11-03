import { DomainEventAttributes } from "../../../../shared/domain/events/DomainEvent";
import { UserDomainEvent } from "./UserDomainEvent";

export class UserEmailUpdatedDomainEvent extends UserDomainEvent {
    static eventName: string = "pnfi.cma.user.email.updated";

    constructor(
        public readonly id: string,
        public readonly email: string,
        eventId?: string,
        occurredOn?: Date
    ) {
        super(UserEmailUpdatedDomainEvent.eventName, id, eventId, occurredOn);
    }

    static fromPrimitives(
        aggregateId: string,
        eventId: string,
        occurredOn: Date,
        attributes: DomainEventAttributes
    ): UserEmailUpdatedDomainEvent {
        return new UserEmailUpdatedDomainEvent(aggregateId, attributes.email as string, eventId, occurredOn);
    }

    toPrimitives(): DomainEventAttributes {
        return {
            id: this.id,
            email: this.email
        };
    }
}
