import { NextRequest } from "next/server";
import { UserDoesNotExist } from "../../../../../../contexts/cma/users/domain/UserDoesNotExist";
import { PostgresUserRepository } from "../../../../../../contexts/cma/users/infrastructure/PostgresUserRepository";
import { InvalidArgumentError } from "../../../../../../contexts/shared/domain/InvalidArgumentError";
import { PostgresConnection } from "../../../../../../contexts/shared/infrastructure/PostgresConnection";
import { DomainEventFailover } from "../../../../../../contexts/shared/infrastructure/event-bus/failover/DomainEventFailover";
import { RabbitMQConnection } from "../../../../../../contexts/shared/infrastructure/event-bus/rabbitmq/RabbitMQConnection";
import { RabbitMQEventBus } from "../../../../../../contexts/shared/infrastructure/event-bus/rabbitmq/RabbitMQEventBus";
import { UserNameUpdater } from "../../../../../../contexts/cma/users/application/update-name/UserNameUpdater";
import { z } from "zod";

const nameValidator = z.object({
	name: z.string()
});

export async function PUT(
	request: NextRequest,
	{ params: { id } }: { params: { id: string } }
): Promise<Response> {
    const json = await request.json();
	const parsed = nameValidator.safeParse(json);

	if (!parsed.success) {
		return new Response(JSON.stringify({ message: parsed.error.message }), {
			status: 422,
			headers: {
				"Content-Type": "application/json"
			}
		});
	}

	const postgresConnection = new PostgresConnection();

	try {
        await new UserNameUpdater(
            new PostgresUserRepository(postgresConnection),
            new RabbitMQEventBus(
                new RabbitMQConnection(),
                new DomainEventFailover(postgresConnection)
            )
        ).update(id, parsed.data.name);
	} catch (error) {
		if (error instanceof UserDoesNotExist) {
			return new Response(
				JSON.stringify({ code: "user_not_found", message: error.message }),
				{
					status: 404,
					headers: {
						"Content-Type": "application/json"
					}
				}
			);
		}

		if (error instanceof InvalidArgumentError) {
			return new Response(
				JSON.stringify({ code: "invalid_argument", message: error.message }),
				{
					status: 422,
					headers: {
						"Content-Type": "application/json"
					}
				}
			);
		}

		return new Response(
			JSON.stringify({ code: "unexpected_error", message: "Something happened" }),
			{
				status: 503,
				headers: {
					"Content-Type": "application/json"
				}
			}
		);
	}

	return new Response("", { status: 202 });
}