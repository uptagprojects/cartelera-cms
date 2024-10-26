import { Service } from "diod";

import { DomainEvent } from "../../../domain/event/DomainEvent";
import { EventBus } from "../../../domain/event/EventBus";
import { DomainEventJSONSerializer } from "../DomainEventJSONSerializer";
import { DomainEventFailover } from "../failover/DomainEventFailover";
import { RabbitMQConnection } from "./RabbitMQConnection";

@Service()
export class RabbitMQEventBus implements EventBus {
	constructor(
		private readonly connection: RabbitMQConnection,
		private readonly failover: DomainEventFailover
	) {}

	async publish(events: DomainEvent[]): Promise<void> {
		const promises = events.map(async event => {
			const serializedEvent = DomainEventJSONSerializer.serialize(event);
			await this.publishRaw(event.eventId, event.eventName, serializedEvent);
		});

		await Promise.all(promises);
	}

	async publishFromFailover(): Promise<void> {
		await this.connection.connect();
		const events = await this.failover.consume(10);

		await Promise.all(
			events.map(event => this.publishRaw(event.eventId, event.eventName, event.body))
		);
	}

	private async publishRaw(eventId: string, eventName: string, serializedEvent: string) {
		try {
			await this.connection.publish(
				"domain_events",
				eventName,
				Buffer.from(serializedEvent),
				{
					messageId: eventId,
					contentType: "application/json",
					contentEncoding: "utf-8"
				}
			);

			return;
		} catch (error: unknown) {
			await this.failover.publish(eventId, eventName, serializedEvent);
		}
	}
}
