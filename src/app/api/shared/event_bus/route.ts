import { NextRequest } from "next/server";

import { DomainEventFailover } from "../../../../contexts/shared/infrastructure/event-bus/failover/DomainEventFailover";
import { RabbitMQConnection } from "../../../../contexts/shared/infrastructure/event-bus/rabbitmq/RabbitMQConnection";
import { RabbitMQEventBus } from "../../../../contexts/shared/infrastructure/event-bus/rabbitmq/RabbitMQEventBus";
import { PostgresConnection } from "../../../../contexts/shared/infrastructure/PostgresConnection";

export async function POST(_request: NextRequest): Promise<Response> {
    const eventBus = new RabbitMQEventBus(new RabbitMQConnection(), new DomainEventFailover(new PostgresConnection()));

    await eventBus.publishFromFailover();

    return new Response(null, { status: 201 });
}
