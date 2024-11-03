import { DomainEventAttributes } from "../../../../shared/domain/event/DomainEvent";
import { GuideDomainEvent } from "./GuideDomainEvent";

export class GuidePostedDomainEvent extends GuideDomainEvent {
	static eventName = "pnfi.cma.guide.posted";
	constructor(
		public readonly id: string,
		public readonly title: string,
		public readonly content: string,
		public readonly ucId: string,
		public readonly authorId: string,
		public readonly status: string,
		eventId?: string,
		occurredOn?: Date
	) {
		super(GuidePostedDomainEvent.eventName, id, eventId, occurredOn);
	}

	static fromPrimitives(
		aggregateId: string,
		eventId: string,
		occurredOn: Date,
		attributes: DomainEventAttributes
	): GuidePostedDomainEvent {
		return new GuidePostedDomainEvent(
			aggregateId,
			attributes.title as string,
			attributes.content as string,
			attributes.ucId as string,
			attributes.authorId as string,
			attributes.status as string,
			eventId,
			occurredOn
		);
	}

	toPrimitives(): Record<string, unknown> {
		return {
			id: this.id,
			title: this.title,
			content: this.content,
			ucId: this.ucId,
			authorId: this.authorId,
			status: this.status
		};
	}
}
