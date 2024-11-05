import { DomainEventAttributes } from "../../../../shared/domain/event/DomainEvent";
import { ScheduleAttachmentDomainEvent } from "./ScheduleAttachmentDomainEvent";

export class ScheduleAttachmentUploadedDomainEvent extends ScheduleAttachmentDomainEvent {
	static eventName = "pnfi.cma.schedule_attachment.uploaded";

	constructor(
		public readonly id: string,
		public readonly name: string,
		public readonly scheduleId: string,
		public readonly url: string,
		public readonly size: number,
		public readonly mimeType: string,
		public readonly storagePath: string,
		eventId?: string,
		occurredOn?: Date
	) {
		super(ScheduleAttachmentUploadedDomainEvent.eventName, id, eventId, occurredOn);
	}

	static fromPrimitives(
		aggregateId: string,
		eventId: string,
		occurredOn: Date,
		attributes: DomainEventAttributes
	): ScheduleAttachmentUploadedDomainEvent {
		return new ScheduleAttachmentUploadedDomainEvent(
			aggregateId,
			attributes.name as string,
			attributes.scheduleId as string,
			attributes.url as string,
			attributes.size as number,
			attributes.mimeType as string,
			attributes.storagePath as string,
			eventId,
			occurredOn
		);
	}

	toPrimitives(): Record<string, unknown> {
		return {
			id: this.id,
			name: this.name,
			scheduleId: this.scheduleId,
			url: this.url,
			size: this.size,
			mimeType: this.mimeType,
			storagePath: this.storagePath
		};
	}
}
