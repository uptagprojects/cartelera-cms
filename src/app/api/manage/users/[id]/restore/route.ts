import { NextRequest } from "next/server";

import { UserRestorer } from "../../../../../../contexts/cma/users/application/restore/UserRestorer";
import { UserDoesNotExistError } from "../../../../../../contexts/cma/users/domain/UserDoesNotExistError";
import { PostgresUserRepository } from "../../../../../../contexts/cma/users/infrastructure/PostgresUserRepository";
import { InvalidArgumentError } from "../../../../../../contexts/shared/domain/InvalidArgumentError";
import { DomainEventFailover } from "../../../../../../contexts/shared/infrastructure/event-bus/failover/DomainEventFailover";
import { RabbitMQConnection } from "../../../../../../contexts/shared/infrastructure/event-bus/rabbitmq/RabbitMQConnection";
import { RabbitMQEventBus } from "../../../../../../contexts/shared/infrastructure/event-bus/rabbitmq/RabbitMQEventBus";
import { PostgresConnection } from "../../../../../../contexts/shared/infrastructure/PostgresConnection";

export async function PUT(_request: NextRequest, { params }: { params: Promise<{ id: string }> }): Promise<Response> {
    const { id } = await params;
    const postgresConnection = new PostgresConnection();

    try {
        await new UserRestorer(
            new PostgresUserRepository(postgresConnection),
            new RabbitMQEventBus(new RabbitMQConnection(), new DomainEventFailover(postgresConnection))
        ).restore(id);
    } catch (error) {
        if (error instanceof UserDoesNotExistError) {
            return new Response(JSON.stringify({ code: "user_not_found", message: error.message }), {
                status: 404,
                headers: {
                    "Content-Type": "application/json"
                }
            });
        }

        if (error instanceof InvalidArgumentError) {
            return new Response(JSON.stringify({ code: "invalid_argument", message: error.message }), {
                status: 422,
                headers: {
                    "Content-Type": "application/json"
                }
            });
        }

        return new Response(JSON.stringify({ code: "unexpected_error", message: "Something happened" }), {
            status: 503,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    return new Response("", { status: 202 });
}
