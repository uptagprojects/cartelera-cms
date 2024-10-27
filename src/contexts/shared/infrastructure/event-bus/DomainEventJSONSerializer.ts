import { DomainEvent } from "../../domain/event/DomainEvent";

export class DomainEventJSONSerializer {
	static serialize(event: DomainEvent): string {
		return JSON.stringify({
			data: {
				id: event.eventId,
				type: event.eventName,
				occurredOn: event.occurredOn.toISOString(),
				aggregateId: event.aggregateId,
				attributes: event.toPrimitives()
			}
		});
	}
}
