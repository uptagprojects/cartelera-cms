import { EventPrimitives } from "../../../../../../src/contexts/cma/events/domain/Event";
import { EventPublishedDomainEvent } from "../../../../../../src/contexts/cma/events/domain/event/EventPublishedDomainEvent";
import { EventEndDateMother } from "../EventEndDateMother";
import { EventIdMother } from "../EventIdMother";
import { EventLocationMother } from "../EventLocationMother";
import { EventNameMother } from "../EventNameMother";
import { EventStartDateMother } from "../EventStartDateMother";

export class EventPublishedDomainEventMother {
	static create(params?: Partial<EventPrimitives>): EventPublishedDomainEvent {
		const primitives: EventPrimitives = {
			id: EventIdMother.create().value,
			name: EventNameMother.create().value,
			location: EventLocationMother.create().value,
			startDate: EventStartDateMother.create().value.toISOString(),
			endDate: EventEndDateMother.create().value.toISOString(),
			...params
		};

		return new EventPublishedDomainEvent(
			primitives.id,
			primitives.name,
			primitives.location,
			primitives.startDate,
			primitives.endDate
		);
	}
}
