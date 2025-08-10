import { DomainEventAttributes } from "../../../../shared/domain/event/DomainEvent";
import { AuthSessionDomainEvent } from "./AuthSessionDomainEvent";

export class AuthSessionStartedDomainEvent extends AuthSessionDomainEvent {
    static eventName = "pnfi.cma.auth_session.started";
    constructor(
        public readonly token: string,
        public readonly userId: string,
        public readonly expiration: string,
        eventId?: string,
        occurredOn?: Date
    ) {
        super(AuthSessionStartedDomainEvent.eventName, userId, eventId, occurredOn);
    }

    static fromPrimitives(
        aggregateId: string,
        eventId: string,
        occurredOn: Date,
        attributes: DomainEventAttributes
    ): AuthSessionStartedDomainEvent {
        return new AuthSessionStartedDomainEvent(
            aggregateId,
            attributes.userId as string,
            attributes.expiration as string,
            eventId,
            occurredOn
        );
    }

    toPrimitives(): Record<string, unknown> {
        return {
            token: this.token,
            userId: this.userId,
            expiration: this.expiration
        };
    }
}
