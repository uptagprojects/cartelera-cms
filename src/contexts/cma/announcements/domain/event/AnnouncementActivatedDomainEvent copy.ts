import { DomainEventAttributes } from "../../../../shared/domain/event/DomainEvent";
import { AnnouncementDomainEvent } from "./AnnouncementDomainEvent";

export class AnnouncementActivatedDomainEvent extends AnnouncementDomainEvent {
	static eventName: string = "pnfi.cma.announcement.deactivated";

	constructor(
		public readonly id: string,
		public readonly active: boolean,
		eventId?: string,
		occurredOn?: Date
	) {
		super(AnnouncementActivatedDomainEvent.eventName, id, eventId, occurredOn);
	}

	static fromPrimitives(
		aggregateId: string,
		eventId: string,
		occurredOn: Date,
		attributes: DomainEventAttributes
	): AnnouncementActivatedDomainEvent {
		return new AnnouncementActivatedDomainEvent(
			aggregateId,
			attributes.active as boolean,
			eventId,
			occurredOn
		);
	}

	toPrimitives(): DomainEventAttributes {
		return {
			id: this.id,
			active: true
		};
	}
}
