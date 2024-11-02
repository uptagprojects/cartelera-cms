import { DomainEventAttributes } from "../../../../shared/domain/event/DomainEvent";
import { AttachmentPrimitives } from "../../../attachments/domain/Attachment";
import { ProfessorPrimitives } from "../Professor/Professor";
import { CdaGuideDomainEvent } from "./CdaGuideDomainEvent";

export class CdaGuidePostedDomainEvent extends CdaGuideDomainEvent {
	static eventName = "pnfi.cda.guide.posted";
	constructor(
		public readonly id: string,
		public readonly title: string,
		public readonly content: string,
		public readonly contentWrapped: string,
		public readonly area: string,
		public readonly professor: ProfessorPrimitives,
		public readonly publishDate: string,
		public readonly attachments: AttachmentPrimitives[],
		eventId?: string,
		occurredOn?: Date
	) {
		super(CdaGuidePostedDomainEvent.eventName, id, eventId, occurredOn);
	}

	static fromPrimitives(
		aggregateId: string,
		eventId: string,
		occurredOn: Date,
		attributes: DomainEventAttributes
	): CdaGuidePostedDomainEvent {
		return new CdaGuidePostedDomainEvent(
			aggregateId,
			attributes.title as string,
			attributes.content as string,
			attributes.contentWrapped as string,
			attributes.area as string,
			attributes.professor as ProfessorPrimitives,
			attributes.publishedDate as string,
			attributes.attachments as AttachmentPrimitives[],
			eventId,
			occurredOn
		);
	}

	toPrimitives(): Record<string, unknown> {
		return {
			id: this.id,
			title: this.title,
			content: this.content,
			contentWrapped: this.contentWrapped,
			area: this.area,
			professor: this.professor,
			publishDate: this.publishDate,
			attachments: this.attachments
		};
	}
}
