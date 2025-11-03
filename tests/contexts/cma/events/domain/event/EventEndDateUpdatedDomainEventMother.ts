import { EventPrimitives } from "../../../../../../src/contexts/cma/events/domain/Event";
import { EventEndDateUpdatedDomainEvent } from "../../../../../../src/contexts/cma/events/domain/events/EventEndDateUpdatedDomainEvent";
import { EventEndDateMother } from "../EventEndDateMother";
import { EventIdMother } from "../EventIdMother";

export class EventEndDateUpdatedDomainEventMother {
	static create(params?: Partial<EventPrimitives>): EventEndDateUpdatedDomainEvent {
		return new EventEndDateUpdatedDomainEvent(
			EventIdMother.create(params?.id).value,
			params?.endDate ?? EventEndDateMother.create().value.toISOString()
		);
	}
}
