import { DomainEventAttributes } from "../../../../shared/domain/event/DomainEvent";
import { ScheduleDomainEvent } from "./ScheduleDomainEvent";

export class ScheduleCreatedDomainEvent extends ScheduleDomainEvent {
	static eventName = "pnfi.cma.schedule.created";
	constructor(
		public readonly id: string,
		public readonly startDate: string,
		public readonly endDate: string,
		eventId?: string,
		occurredOn?: Date
	) {
		super(ScheduleCreatedDomainEvent.eventName, id, eventId, occurredOn);
	}

	static fromPrimitives(
		aggregateId: string,
		eventId: string,
		occurredOn: Date,
		attributes: DomainEventAttributes
	): ScheduleCreatedDomainEvent {
		return new ScheduleCreatedDomainEvent(
			aggregateId,
			attributes.startDate as string,
			attributes.endDate as string,
			eventId,
			occurredOn
		);
	}

	toPrimitives(): Record<string, unknown> {
		return {
			id: this.id,
			startDate: this.startDate,
			endDate: this.endDate,
		};
	}
}
