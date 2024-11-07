import { NextRequest } from "next/server";
import { z } from "zod";

import { InvalidArgumentError } from "../../../../../../contexts/shared/domain/InvalidArgumentError";
import { DomainEventFailover } from "../../../../../../contexts/shared/infrastructure/event-bus/failover/DomainEventFailover";
import { RabbitMQConnection } from "../../../../../../contexts/shared/infrastructure/event-bus/rabbitmq/RabbitMQConnection";
import { RabbitMQEventBus } from "../../../../../../contexts/shared/infrastructure/event-bus/rabbitmq/RabbitMQEventBus";
import { PostgresConnection } from "../../../../../../contexts/shared/infrastructure/PostgresConnection";
import { CourseLocationUpdater } from "../../../../../../contexts/cma/courses/application/update-location/CourseLocationUpdater";
import { PostgresCourseRepository } from "../../../../../../contexts/cma/courses/infrastructure/PostgresCourseRepository";
import { CourseDoesNotExists } from "../../../../../../contexts/cma/courses/domain/CourseDoesNotExists";

const validator = z.object({
	location: z.string()
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
		await new CourseLocationUpdater(
			new PostgresCourseRepository(postgresConnection),
			new RabbitMQEventBus(
				new RabbitMQConnection(),
				new DomainEventFailover(postgresConnection)
			)
		).update(id, parsed.data.location);
	} catch (error) {
		if (error instanceof CourseDoesNotExists) {
			return new Response(
				JSON.stringify({ code: "course_not_found", message: error.message }),
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
