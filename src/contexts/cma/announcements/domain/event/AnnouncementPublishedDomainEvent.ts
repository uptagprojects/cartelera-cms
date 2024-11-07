import { DomainEventAttributes } from "../../../../shared/domain/event/DomainEvent";
import { AnnouncementDomainEvent } from "./AnnouncementDomainEvent";

export class AnnouncementPublishedDomainEvent extends AnnouncementDomainEvent {
	static eventName = "pnfi.cma.announcement.published";
	constructor(
		public readonly id: string,
		public readonly title: string,
		public readonly content: string,
		public readonly publishDate: string,
		public readonly type: string,
		eventId?: string,
		occurredOn?: Date
	) {
		super(AnnouncementPublishedDomainEvent.eventName, id, eventId, occurredOn);
	}

	static fromPrimitives(
		aggregateId: string,
		eventId: string,
		occurredOn: Date,
		attributes: DomainEventAttributes
	): AnnouncementPublishedDomainEvent {
		return new AnnouncementPublishedDomainEvent(
			aggregateId,
			attributes.title as string,
			attributes.content as string,
			attributes.publishDate as string,
			attributes.type as string,
			eventId,
			occurredOn
		);
	}

	toPrimitives(): Record<string, unknown> {
		return {
			id: this.id,
			title: this.title,
			content: this.content,
			publishDate: this.publishDate,
			type: this.type
		};
	}
}
