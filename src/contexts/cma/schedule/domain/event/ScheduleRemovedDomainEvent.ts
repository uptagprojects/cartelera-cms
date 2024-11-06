import { DomainEventAttributes } from "../../../../shared/domain/event/DomainEvent";
import { ScheduleDomainEvent } from "./ScheduleDomainEvent";

export class ScheduleRemovedDomainEvent extends ScheduleDomainEvent {
	static eventName = "pnfi.cma.schedule.removed";

	constructor(
		public readonly id: string,
		eventId?: string,
		occurredOn?: Date
	) {
		super(ScheduleRemovedDomainEvent.eventName, id, eventId, occurredOn);
	}

	static fromPrimitives(
		aggregateId: string,
		eventId: string,
		occurredOn: Date,
		_attributes: DomainEventAttributes
	): ScheduleRemovedDomainEvent {
		return new ScheduleRemovedDomainEvent(aggregateId, eventId, occurredOn);
	}

	toPrimitives(): DomainEventAttributes {
		return {
			id: this.id
		};
	}
}
