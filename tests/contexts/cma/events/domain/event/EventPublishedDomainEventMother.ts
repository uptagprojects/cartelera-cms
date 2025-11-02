import { EventPrimitives } from "../../../../../../src/contexts/cma/events/domain/Event";
import { EventPublishedDomainEvent } from "../../../../../../src/contexts/cma/events/domain/event/EventPublishedDomainEvent";
import { EventEndDateMother } from "../EventEndDateMother";
import { EventIdMother } from "../EventIdMother";
import { EventLocationMother } from "../EventLocationMother";
import { EventNameMother } from "../EventNameMother";
import { EventStartDateMother } from "../EventStartDateMother";

export class EventPublishedDomainEventMother {
	static create(params?: Partial<EventPrimitives>): EventPublishedDomainEvent {
		return new EventPublishedDomainEvent(
			EventIdMother.create(params?.id).value,
			EventNameMother.create(params?.name).value,
			EventLocationMother.create(params?.location).value,
			params?.startDate ?? EventStartDateMother.create().value.toISOString(),
			params?.endDate ?? EventEndDateMother.create().value.toISOString()
		);
	}
}
