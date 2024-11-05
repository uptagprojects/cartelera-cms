import { DomainEventAttributes } from "../../../../shared/domain/event/DomainEvent";
import { ScheduleDomainEvent } from "./ScheduleDomainEvent";

export class ScheduleStartDateUpdatedDomainEvent extends ScheduleDomainEvent {
	static eventName: string = "pnfi.cma.schedule.startDate.updated";

	constructor(
		public readonly id: string,
		public readonly startDate: string,
		eventId?: string,
		occurredOn?: Date
	) {
		super(ScheduleStartDateUpdatedDomainEvent.eventName, id, eventId, occurredOn);
	}

	static fromPrimitives(
		aggregateId: string,
		eventId: string,
		occurredOn: Date,
		attributes: DomainEventAttributes
	): ScheduleStartDateUpdatedDomainEvent {
		return new ScheduleStartDateUpdatedDomainEvent(
			aggregateId,
			attributes.startDate as string,
			eventId,
			occurredOn
		);
	}

	toPrimitives(): DomainEventAttributes {
		return {
			id: this.id,
			startDate: this.startDate
		};
	}
}
