import { DomainEvent, DomainEventAttributes } from "../../../../shared/domain/event/DomainEvent";

export class WelcomeEmailSentDomainEvent extends DomainEvent {
	static eventName = "pnfi.system.welcome_email.sent";
	constructor(
		public readonly id: string,
		public readonly fromEmailAddress: string,
		public readonly toEmailAddress: string,
		public readonly emailSubject: string,
		public readonly emailHTMLBody: string,
		public readonly emailTextBody: string,
		eventId?: string,
		occurredOn?: Date
	) {
		super(WelcomeEmailSentDomainEvent.eventName, id, eventId, occurredOn);
	}

	static fromPrimitives(
		aggregateId: string,
		eventId: string,
		occurredOn: Date,
		attributes: DomainEventAttributes
	): WelcomeEmailSentDomainEvent {
		return new WelcomeEmailSentDomainEvent(
			aggregateId,
			attributes.fromEmailAddress as string,
			attributes.toEmailAddress as string,
			attributes.emailSubject as string,
			attributes.emailHTMLBody as string,
			attributes.emailTextBody as string,
			eventId,
			occurredOn
		);
	}

	toPrimitives(): Record<string, unknown> {
		return {
			id: this.id,
			fromEmailAddress: this.fromEmailAddress,
			toEmailAddress: this.toEmailAddress,
			emailSubject: this.emailSubject,
			emailHTMLBody: this.emailHTMLBody,
			emailTextBody: this.emailTextBody
		};
	}
}
