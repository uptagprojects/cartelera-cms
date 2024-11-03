import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { UserFinder } from "../../../../../contexts/cma/users/application/find/UserFinder";
import { UserRegistrar } from "../../../../../contexts/cma/users/application/registrar/UserRegistrar";
import { UserDoesNotExist } from "../../../../../contexts/cma/users/domain/UserDoesNotExist";
import { PostgresUserRepository } from "../../../../../contexts/cma/users/infrastructure/PostgresUserRepository";
import { InvalidArgumentError } from "../../../../../contexts/shared/domain/InvalidArgumentError";
import { DomainEventFailover } from "../../../../../contexts/shared/infrastructure/event-bus/failover/DomainEventFailover";
import { RabbitMQConnection } from "../../../../../contexts/shared/infrastructure/event-bus/rabbitmq/RabbitMQConnection";
import { RabbitMQEventBus } from "../../../../../contexts/shared/infrastructure/event-bus/rabbitmq/RabbitMQEventBus";
import { PostgresConnection } from "../../../../../contexts/shared/infrastructure/PostgresConnection";

const userValidator = z.object({
	id: z.string().uuid(),
	name: z.string(),
	email: z.string().email(),
	avatar: z.string().url()
});

export async function PUT(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
): Promise<Response> {
	const { id } = await params;
	const json = await request.json();
	const parsed = userValidator.safeParse(json);
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
				code: "invalid_user_id",
				message: "The user id in the URL does not match the user id in the body"
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
		await new UserRegistrar(
			new PostgresUserRepository(postgresConnection),
			new RabbitMQEventBus(
				new RabbitMQConnection(),
				new DomainEventFailover(postgresConnection)
			)
		).register(id, body.name, body.email, body.avatar);
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

	return new Response("", { status: 201 });
}

export async function GET(
	_: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
): Promise<Response> {
	const { id } = await params;
	const postgresConnection = new PostgresConnection();
	let user = null;
	try {
		const userRepository = new PostgresUserRepository(postgresConnection);
		const userFinder = new UserFinder(userRepository);
		user = await userFinder.find(id);
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

	return NextResponse.json(user.toPrimitives());
}
