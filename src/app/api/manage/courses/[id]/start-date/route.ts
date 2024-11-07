import { NextRequest } from "next/server";
import { z } from "zod";

import { InvalidArgumentError } from "../../../../../../contexts/shared/domain/InvalidArgumentError";
import { DomainEventFailover } from "../../../../../../contexts/shared/infrastructure/event-bus/failover/DomainEventFailover";
import { RabbitMQConnection } from "../../../../../../contexts/shared/infrastructure/event-bus/rabbitmq/RabbitMQConnection";
import { RabbitMQEventBus } from "../../../../../../contexts/shared/infrastructure/event-bus/rabbitmq/RabbitMQEventBus";
import { PostgresConnection } from "../../../../../../contexts/shared/infrastructure/PostgresConnection";
import { PostgresEventRepository } from "../../../../../../contexts/cma/events/infrastructure/PostgresEventRepository";
import { EventDoesNotExist } from "../../../../../../contexts/cma/events/domain/EventDoesNotExist";
import { EventStartDateUpdater } from "../../../../../../contexts/cma/events/application/update-start-date/EventStartDateUpdater";

const validator = z.object({
	startDate: z.string().date()
});

export async function PUT(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
): Promise<Response> {
	const { id } = await params;
	const json = await request.json();
	const parsed = validator.safeParse(json);

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
		await new EventStartDateUpdater(
			new PostgresEventRepository(postgresConnection),
			new RabbitMQEventBus(
				new RabbitMQConnection(),
				new DomainEventFailover(postgresConnection)
			)
		).update(id, parsed.data.startDate);
	} catch (error) {
		if (error instanceof EventDoesNotExist) {
			return new Response(
				JSON.stringify({ code: "event_not_found", message: error.message }),
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
