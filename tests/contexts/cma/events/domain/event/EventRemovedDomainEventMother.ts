import { EventPrimitives } from "../../../../../../src/contexts/cma/events/domain/Event";
import { EventRemovedDomainEvent } from "../../../../../../src/contexts/cma/events/domain/event/EventRemovedDomainEvent";
import { EventIdMother } from "../EventIdMother";

export class EventRemovedDomainEventMother {
	static create(params?: Partial<EventPrimitives>): EventRemovedDomainEvent {
		return new EventRemovedDomainEvent(EventIdMother.create(params?.id).value);
	}
}
