import { DomainEventAttributes } from "../../../../shared/domain/event/DomainEvent";
import { ScheduleDomainEvent } from "./ScheduleDomainEvent";

export class ScheduleEndDateUpdatedDomainEvent extends ScheduleDomainEvent {
	static eventName: string = "pnfi.cma.schedule.endDate.updated";

	constructor(
		public readonly id: string,
		public readonly endDate: string,
		eventId?: string,
		occurredOn?: Date
	) {
		super(ScheduleEndDateUpdatedDomainEvent.eventName, id, eventId, occurredOn);
	}

	static fromPrimitives(
		aggregateId: string,
		eventId: string,
		occurredOn: Date,
		attributes: DomainEventAttributes
	): ScheduleEndDateUpdatedDomainEvent {
		return new ScheduleEndDateUpdatedDomainEvent(
			aggregateId,
			attributes.endDate as string,
			eventId,
			occurredOn
		);
	}

	toPrimitives(): DomainEventAttributes {
		return {
			id: this.id,
			endDate: this.endDate
		};
	}
}
