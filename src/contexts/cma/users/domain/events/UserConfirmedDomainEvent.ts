import { DomainEventAttributes } from "../../../../shared/domain/events/DomainEvent";
import { UserDomainEvent } from "./UserDomainEvent";

export class UserConfirmedDomainEvent extends UserDomainEvent {
    static eventName = "pnfi.cma.user.confirmed";

    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly avatar: string,
        eventId?: string,
        occurredOn?: Date
    ) {
        super(UserConfirmedDomainEvent.eventName, id, eventId, occurredOn);
    }

    static fromPrimitives(
        aggregateId: string,
        eventId: string,
        occurredOn: Date,
        attributes: DomainEventAttributes
    ): UserConfirmedDomainEvent {
        return new UserConfirmedDomainEvent(
            aggregateId,
            eventId,
            attributes.name as string,
            attributes.avatar as string,
            occurredOn
        );
    }

    toPrimitives(): DomainEventAttributes {
        return {
            id: this.id,
            name: this.name,
            avatar: this.avatar
        };
    }
}
