import { DomainEventAttributes } from "../../../../shared/domain/event/DomainEvent";
import { AnnouncementDomainEvent } from "./AnnouncementDomainEvent";

export class AnnouncementArchivedDomainEvent extends AnnouncementDomainEvent {
	static eventName: string = "pnfi.cma.announcement.archived";

	constructor(
		public readonly id: string,
		eventId?: string,
		occurredOn?: Date
	) {
		super(AnnouncementArchivedDomainEvent.eventName, id, eventId, occurredOn);
	}

	static fromPrimitives(
		aggregateId: string,
		eventId: string,
		occurredOn: Date,
		_: DomainEventAttributes
	): AnnouncementArchivedDomainEvent {
		return new AnnouncementArchivedDomainEvent(
			aggregateId,
			eventId,
			occurredOn
		);
	}

	toPrimitives(): DomainEventAttributes {
		return {
			id: this.id
		};
	}
}
