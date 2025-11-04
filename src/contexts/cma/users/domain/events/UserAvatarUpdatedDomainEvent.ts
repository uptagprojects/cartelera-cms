import { DomainEventAttributes } from "../../../../shared/domain/events/DomainEvent";
import { UserDomainEvent } from "./UserDomainEvent";

export class UserAvatarUpdatedDomainEvent extends UserDomainEvent {
    static eventName: string = "pnfi.cma.user.avatar.updated";

    constructor(
        public readonly id: string,
        public readonly avatar: string,
        eventId?: string,
        occurredOn?: Date
    ) {
        super(UserAvatarUpdatedDomainEvent.eventName, id, eventId, occurredOn);
    }

    static fromPrimitives(
        aggregateId: string,
        eventId: string,
        occurredOn: Date,
        attributes: DomainEventAttributes
    ): UserAvatarUpdatedDomainEvent {
        return new UserAvatarUpdatedDomainEvent(aggregateId, attributes.avatar as string, eventId, occurredOn);
    }

    toPrimitives(): DomainEventAttributes {
        return {
            id: this.id,
            avatar: this.avatar
        };
    }
}
