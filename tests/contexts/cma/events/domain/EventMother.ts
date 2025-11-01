import { Event, EventPrimitives } from "../../../../../src/contexts/cma/events/domain/Event";
import { EventEndDateMother } from "./EventEndDateMother";
import { EventIdMother } from "./EventIdMother";
import { EventLocationMother } from "./EventLocationMother";
import { EventNameMother } from "./EventNameMother";
import { EventStartDateMother } from "./EventStartDateMother";

export class EventMother {
	static create(params?: Partial<EventPrimitives>): Event {
		const primitives: EventPrimitives = {
			id: EventIdMother.create().value,
			name: EventNameMother.create().value,
			location: EventLocationMother.create().value,
			startDate: EventStartDateMother.create().value.toISOString(),
			endDate: EventEndDateMother.create().value.toISOString(),
			...params
		};

		return Event.fromPrimitives(primitives);
	}
}
