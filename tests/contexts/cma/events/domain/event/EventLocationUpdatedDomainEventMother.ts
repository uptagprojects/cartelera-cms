import { EventPrimitives } from "../../../../../../src/contexts/cma/events/domain/Event";
import { EventLocationUpdatedDomainEvent } from "../../../../../../src/contexts/cma/events/domain/event/EventLocationUpdatedDomainEvent";
import { EventIdMother } from "../EventIdMother";
import { EventLocationMother } from "../EventLocationMother";

export class EventLocationUpdatedDomainEventMother {
	static create(params?: Partial<EventPrimitives>): EventLocationUpdatedDomainEvent {
		return new EventLocationUpdatedDomainEvent(
			EventIdMother.create(params?.id).value,
			EventLocationMother.create(params?.location).value
		);
	}
}
