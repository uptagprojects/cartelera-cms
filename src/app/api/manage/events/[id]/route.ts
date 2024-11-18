import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { EventFinder } from "../../../../../contexts/cma/events/application/find/EventFinder";
import { EventPublisher } from "../../../../../contexts/cma/events/application/publish/EventPublisher";
import { EventDoesNotExist } from "../../../../../contexts/cma/events/domain/EventDoesNotExist";
import { PostgresEventRepository } from "../../../../../contexts/cma/events/infrastructure/PostgresEventRepository";
import { InvalidArgumentError } from "../../../../../contexts/shared/domain/InvalidArgumentError";
import { DomainEventFailover } from "../../../../../contexts/shared/infrastructure/event-bus/failover/DomainEventFailover";
import { RabbitMQConnection } from "../../../../../contexts/shared/infrastructure/event-bus/rabbitmq/RabbitMQConnection";
import { RabbitMQEventBus } from "../../../../../contexts/shared/infrastructure/event-bus/rabbitmq/RabbitMQEventBus";
import { PostgresConnection } from "../../../../../contexts/shared/infrastructure/PostgresConnection";

const validator = z.object({
	id: z.string().uuid(),
	name: z.string(),
	location: z.string(),
	startDate: z.date(),
	endDate: z.date()
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

	if (id !== parsed.data.id) {
		return new Response(
			JSON.stringify({
				code: "invalid_event_id",
				message: "The event id in the URL does not match the event id in the body"
			}),
			{
				status: 400,
				headers: {
					"Content-Type": "application/json"
				}
			}
		);
	}

	const { data: body } = parsed;

	const postgresConnection = new PostgresConnection();

	try {
		await new EventPublisher(
			new PostgresEventRepository(postgresConnection),
			new RabbitMQEventBus(
				new RabbitMQConnection(),
				new DomainEventFailover(postgresConnection)
			)
		).publish(
			id,
			body.name,
			body.location,
			body.startDate.toISOString(),
			body.endDate.toISOString()
		);
	} catch (error) {
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

	return new Response("", { status: 201 });
}

export async function GET(
	_: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
): Promise<Response> {
	const { id } = await params;
	let event = null;
	try {
		const eventRepository = new PostgresEventRepository(new PostgresConnection());
		const eventFinder = new EventFinder(eventRepository);
		event = await eventFinder.find(id);
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

	return NextResponse.json(event.toPrimitives());
}
