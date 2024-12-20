import "reflect-metadata";

import { DomainEvent } from "../contexts/shared/domain/event/DomainEvent";
import { DomainEventSubscriber } from "../contexts/shared/domain/event/DomainEventSubscriber";
import { container } from "../contexts/shared/infrastructure/dependency-injection/diod.config";
import { RabbitMQConnection } from "../contexts/shared/infrastructure/event-bus/rabbitmq/RabbitMQConnection";
import { logger } from "../contexts/shared/infrastructure/telemetry/telemetry";

const connection = new RabbitMQConnection();

const exchangeName = "domain_events";

const subscribers = container
	.findTaggedServiceIdentifiers<DomainEventSubscriber<DomainEvent>>("subscriber")
	.map(id => container.get(id));

const queues: {
	name: string;
	bindingKeys: string[];
}[] = subscribers.map(subscriber => ({
	name: subscriber.name(),
	bindingKeys: subscriber.subscribedTo().map(event => event.eventName)
}));

async function main(): Promise<void> {
	await connection.connect();
	await connection.declareExchange(exchangeName);
	await Promise.all(
		queues.map(async queue =>
			connection.declareQueue(queue.name, exchangeName, queue.bindingKeys)
		)
	);
	await connection.close();
}

main().catch((error: unknown) => {
	logger.error("Error configuring RabbitMQ", error);
});
