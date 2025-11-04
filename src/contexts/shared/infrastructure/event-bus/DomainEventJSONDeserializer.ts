import { DomainEvent, DomainEventAttributes } from "../../domain/events/DomainEvent";
import { DomainEventClass } from "../../domain/events/DomainEventClass";

export interface DomainEventJSON {
    id: string;
    type: string;
    occurredOn: string;
    aggregateId: string;
    attributes: DomainEventAttributes;
}

export class DomainEventJSONDeserializer {
    constructor(private readonly eventMapping: Map<string, DomainEventClass>) {}

    deserialize(event: string): DomainEvent {
        const eventData = JSON.parse(event).data as DomainEventJSON;
        const eventClass = this.eventMapping.get(eventData.type);

        if (!eventClass) {
            throw Error(`DomainEvent mapping not found for event ${eventData.type}`);
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return eventClass.fromPrimitives(
            eventData.aggregateId,
            eventData.id,
            new Date(eventData.occurredOn),
            eventData.attributes
        );
    }
}
