import { DomainEventAttributes } from "../../../../shared/domain/event/DomainEvent";
import { UserDomainEvent } from "./UserDomainEvent";

export class UserRegisteredDomainEvent extends UserDomainEvent {
    static eventName = "pnfi.cma.user.registered";
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly email: string,
        public readonly avatar: string,
        public readonly status: string,
        public readonly presenterName: string,
        public readonly presenterEmail: string,
        eventId?: string,
        occurredOn?: Date
    ) {
        super(UserRegisteredDomainEvent.eventName, id, eventId, occurredOn);
    }

    static fromPrimitives(
        aggregateId: string,
        eventId: string,
        occurredOn: Date,
        attributes: DomainEventAttributes
    ): UserRegisteredDomainEvent {
        return new UserRegisteredDomainEvent(
            aggregateId,
            attributes.name as string,
            attributes.email as string,
            attributes.avatar as string,
            attributes.status as string,
            attributes.presenterName as string,
            attributes.presenterEmail as string,
            eventId,
            occurredOn
        );
    }

    toPrimitives(): Record<string, unknown> {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            avatar: this.avatar,
            status: this.status,
            presenterName: this.presenterName,
            presenterEmail: this.presenterEmail
        };
    }
}
