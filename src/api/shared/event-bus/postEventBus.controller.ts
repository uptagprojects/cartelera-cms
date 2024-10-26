import { Context } from "hono";
import { RabbitMQEventBus } from "../../../contexts/shared/infrastructure/event-bus/rabbitmq/RabbitMQEventBus";
import { RabbitMQConnection } from "../../../contexts/shared/infrastructure/event-bus/rabbitmq/RabbitMQConnection";
import { DomainEventFailover } from "../../../contexts/shared/infrastructure/event-bus/failover/DomainEventFailover";
import { PostgresConnection } from "../../../contexts/shared/infrastructure/PostgresConnection";

export async function postEventBus(c: Context): Promise<Response> {
    const eventBus = new  RabbitMQEventBus(
        new RabbitMQConnection(),
        new DomainEventFailover(new PostgresConnection())
    );

    await eventBus.publishFromFailover();

    return c.text("", 201);
}