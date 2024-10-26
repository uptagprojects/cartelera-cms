import { DomainEvent } from "../../../../shared/domain/event/DomainEvent";

export class UserRegisteredDomainEvent extends DomainEvent {
    static eventName = "pnfi.cartelera.cma.user.registered";
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly email: string,
        public readonly avatar: string,
        public readonly status: string,
        eventId?: string,
        occurredOn?: Date
    ) {
        super(UserRegisteredDomainEvent.eventName, id, eventId, occurredOn);
    }

    toPrimitives(): Record<string, unknown> {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            avatar: this.avatar,
            status: this.status
        };
    }
}