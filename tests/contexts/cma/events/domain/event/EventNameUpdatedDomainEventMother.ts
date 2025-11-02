import { EventPrimitives } from "../../../../../../src/contexts/cma/events/domain/Event";
import { EventNameUpdatedDomainEvent } from "../../../../../../src/contexts/cma/events/domain/event/EventNameUpdatedDomainEvent";
import { EventIdMother } from "../EventIdMother";
import { EventNameMother } from "../EventNameMother";

export class EventNameUpdatedDomainEventMother {
	static create(params?: Partial<EventPrimitives>): EventNameUpdatedDomainEvent {
		return new EventNameUpdatedDomainEvent(
			EventIdMother.create(params?.id).value,
			EventNameMother.create(params?.name).value
		);
	}
}
