import { DomainEvent, DomainEventAttributes } from "../../../../shared/domain/event/DomainEvent";

export class UserUpdatedNotificationEmailSentDomainEvent extends DomainEvent {
    static eventName = "pnfi.system.user_updated_notification_email.sent";
    constructor(
        public readonly id: string,
        public readonly userId: string,
        public readonly userName: string,
        public readonly propertyChanged: string,
        public readonly fromEmailAddress: string,
        public readonly toEmailAddress: string,
        public readonly emailSubject: string,
        public readonly emailBody: string,
        eventId?: string,
        occurredOn?: Date
    ) {
        super(UserUpdatedNotificationEmailSentDomainEvent.eventName, id, eventId, occurredOn);
    }

    static fromPrimitives(
        aggregateId: string,
        eventId: string,
        occurredOn: Date,
        attributes: DomainEventAttributes
    ): UserUpdatedNotificationEmailSentDomainEvent {
        return new UserUpdatedNotificationEmailSentDomainEvent(
            aggregateId,
            attributes.userId as string,
            attributes.userName as string,
            attributes.propertyChanged as string,
            attributes.fromEmailAddress as string,
            attributes.toEmailAddress as string,
            attributes.emailSubject as string,
            attributes.emailBody as string,
            eventId,
            occurredOn
        );
    }

    toPrimitives(): Record<string, unknown> {
        return {
            id: this.id,
            userId: this.userId,
            userName: this.userName,
            propertyChanged: this.propertyChanged,
            fromEmailAddress: this.fromEmailAddress,
            toEmailAddress: this.toEmailAddress,
            emailSubject: this.emailSubject,
            emailBody: this.emailBody
        };
    }
}
