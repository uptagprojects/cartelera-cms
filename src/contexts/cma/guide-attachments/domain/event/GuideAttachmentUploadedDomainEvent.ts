import { DomainEventAttributes } from "../../../../shared/domain/event/DomainEvent";
import { GuideAttachmentDomainEvent } from "./GuideAttachmentDomainEvent";

export class GuideAttachmentUploadedDomainEvent extends GuideAttachmentDomainEvent {
	static eventName = "pnfi.cma.guide_attachment.uploaded";

	constructor(
		public readonly id: string,
		public readonly guideId: string,
		public readonly url: string,
		eventId?: string,
		occurredOn?: Date
	) {
		super(GuideAttachmentUploadedDomainEvent.eventName, id, eventId, occurredOn);
	}

	static fromPrimitives(
		aggregateId: string,
		eventId: string,
		occurredOn: Date,
		attributes: DomainEventAttributes
	): GuideAttachmentUploadedDomainEvent {
		return new GuideAttachmentUploadedDomainEvent(
			aggregateId,
			attributes.guideId as string,
			attributes.url as string,
			eventId,
			occurredOn
		);
	}

	toPrimitives(): Record<string, unknown> {
		return {
			id: this.id,
			guideId: this.guideId,
			url: this.url
		};
	}
}
