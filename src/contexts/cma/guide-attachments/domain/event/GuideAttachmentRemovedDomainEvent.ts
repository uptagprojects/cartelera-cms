import { DomainEventAttributes } from "../../../../shared/domain/event/DomainEvent";
import { GuideAttachmentDomainEvent } from "./GuideAttachmentDomainEvent";

export class GuideAttachmentRemovedDomainEvent extends GuideAttachmentDomainEvent {
	static eventName = "pnfi.cma.guide_attachment.removed";

	constructor(
		public readonly id: string,
		public readonly storagePath: string,
		eventId?: string,
		occurredOn?: Date
	) {
		super(GuideAttachmentRemovedDomainEvent.eventName, id, eventId, occurredOn);
	}

	static fromPrimitives(
		aggregateId: string,
		eventId: string,
		occurredOn: Date,
		attributes: DomainEventAttributes
	): GuideAttachmentRemovedDomainEvent {
		return new GuideAttachmentRemovedDomainEvent(
			aggregateId,
			attributes.storagePath as string,
			eventId,
			occurredOn
		);
	}

	toPrimitives(): DomainEventAttributes {
		return {
			id: this.id,
			storagePath: this.storagePath
		};
	}
}
