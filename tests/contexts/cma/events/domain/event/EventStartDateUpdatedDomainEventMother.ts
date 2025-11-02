import { EventPrimitives } from "../../../../../../src/contexts/cma/events/domain/Event";
import { EventStartDateUpdatedDomainEvent } from "../../../../../../src/contexts/cma/events/domain/event/EventStartDateUpdatedDomainEvent";
import { EventIdMother } from "../EventIdMother";
import { EventStartDateMother } from "../EventStartDateMother";

export class EventStartDateUpdatedDomainEventMother {
	static create(params?: Partial<EventPrimitives>): EventStartDateUpdatedDomainEvent {
		return new EventStartDateUpdatedDomainEvent(
			EventIdMother.create(params?.id).value,
			params?.startDate ?? EventStartDateMother.create().value.toISOString()
		);
	}
}
