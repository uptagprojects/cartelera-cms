import { DomainEvent, DomainEventAttributes } from "../../../../shared/domain/event/DomainEvent";

export class ArchivedEmailSentDomainEvent extends DomainEvent {
	static eventName = "pnfi.system.arvhied_email.sent";
	constructor(
		public readonly id: string,
		public readonly userId: string,
		public readonly userName: string,
		public readonly fromEmailAddress: string,
		public readonly toEmailAddress: string,
		public readonly emailSubject: string,
		public readonly emailHTMLBody: string,
		public readonly emailTextBody: string,
		eventId?: string,
		occurredOn?: Date
	) {
		super(ArchivedEmailSentDomainEvent.eventName, id, eventId, occurredOn);
	}

	static fromPrimitives(
		aggregateId: string,
		eventId: string,
		occurredOn: Date,
		attributes: DomainEventAttributes
	): ArchivedEmailSentDomainEvent {
		return new ArchivedEmailSentDomainEvent(
			aggregateId,
			attributes.userId as string,
			attributes.userName as string,
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
			userId: this.userId,
			userName: this.userName,
			fromEmailAddress: this.fromEmailAddress,
			toEmailAddress: this.toEmailAddress,
			emailSubject: this.emailSubject,
			emailHTMLBody: this.emailHTMLBody,
			emailTextBody: this.emailTextBody
		};
	}
}
