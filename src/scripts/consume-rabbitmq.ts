import "reflect-metadata";

import { ConsumeMessage } from "amqplib";

import { DomainEvent } from "../contexts/shared/domain/event/DomainEvent";
import { DomainEventClass } from "../contexts/shared/domain/event/DomainEventClass";
import { DomainEventSubscriber } from "../contexts/shared/domain/event/DomainEventSubscriber";
import { container } from "../contexts/shared/infrastructure/dependency-injection/diod.config";
import { DomainEventJSONDeserializer } from "../contexts/shared/infrastructure/event-bus/DomainEventJSONDeserializer";
import { RabbitMQConnection } from "../contexts/shared/infrastructure/event-bus/rabbitmq/RabbitMQConnection";
import { logger } from "../contexts/shared/infrastructure/telemetry/telemetry";

const connection = new RabbitMQConnection();

const subscribers = container
	.findTaggedServiceIdentifiers<DomainEventSubscriber<DomainEvent>>("subscriber")
	.map(id => container.get(id));

const eventMapping = new Map<string, DomainEventClass>();

subscribers.forEach(subscriber => {
	subscriber.subscribedTo().forEach(eventClass => {
		eventMapping.set(eventClass.eventName, eventClass);
	});
});

const deserializer = new DomainEventJSONDeserializer(eventMapping);

async function main(): Promise<void> {
	await connection.connect();

	await Promise.all(
		subscribers.map(subscriber => connection.consume(subscriber.name(), consume(subscriber)))
	);
}

function consume(subscriber: DomainEventSubscriber<DomainEvent>) {
	return async function (message: ConsumeMessage): Promise<void> {
		const content = message.content.toString();
		const domainEvent = deserializer.deserialize(content);

		await subscriber.on(domainEvent);
		await connection.ack(message);
	};
}

main().catch((error: unknown) => {
	logger.error("Error consuming RabbitMQ", error);
});
