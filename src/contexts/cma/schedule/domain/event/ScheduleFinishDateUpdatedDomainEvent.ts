import { DomainEventAttributes } from "../../../../shared/domain/event/DomainEvent";
import { ScheduleDomainEvent } from "./ScheduleDomainEvent";
export class ScheduleArchivedDomainEvent extends ScheduleDomainEvent {
	static eventName = "pnfi.cma.schedule.finish.date.updated";
	constructor(
		public readonly id: string,
		eventId?: string,
		occurredOn?: Date
	) {
		super(ScheduleArchivedDomainEvent.eventName, id, eventId, occurredOn);
	}
	static fromPrimitives(
		aggregateId: string,
		eventId: string,
		occurredOn: Date,
		_attributes: DomainEventAttributes
	): ScheduleArchivedDomainEvent {
		return new ScheduleArchivedDomainEvent(aggregateId, eventId, occurredOn);
	}
	toPrimitives(): DomainEventAttributes {
		return {
			id: this.id
		};
	}
}