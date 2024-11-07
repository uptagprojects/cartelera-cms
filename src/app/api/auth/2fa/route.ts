import { NextRequest } from "next/server";
import { z } from "zod";

const recoveryValidator = z.object({
	id: z.string().uuid(),
	recoveryCode: z.string()
});

export async function PUT(request: NextRequest): Promise<Response> {
	const json = await request.json();
	const parsed = recoveryValidator.safeParse(json);
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
