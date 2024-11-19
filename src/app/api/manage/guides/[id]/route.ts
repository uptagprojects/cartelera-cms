import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { GuideFinder } from "../../../../../contexts/cma/guides/application/find/GuideFinder";
import { GuidePoster } from "../../../../../contexts/cma/guides/application/post/GuidePoster";
import { GuideDoesNotExist } from "../../../../../contexts/cma/guides/domain/GuideDoesNotExist";
import { PostgresGuideRepository } from "../../../../../contexts/cma/guides/infrastructure/PostgresGuideRepository";
import { UCFinder } from "../../../../../contexts/cma/uc/domain/UCFinder";
import { PostgresUCRepository } from "../../../../../contexts/cma/uc/infrastructure/PostgresUCRepository";
import { UserFinder } from "../../../../../contexts/cma/users/domain/UserFinder";
import { PostgresUserRepository } from "../../../../../contexts/cma/users/infrastructure/PostgresUserRepository";
import { DomainEventFailover } from "../../../../../contexts/shared/infrastructure/event-bus/failover/DomainEventFailover";
import { RabbitMQConnection } from "../../../../../contexts/shared/infrastructure/event-bus/rabbitmq/RabbitMQConnection";
import { RabbitMQEventBus } from "../../../../../contexts/shared/infrastructure/event-bus/rabbitmq/RabbitMQEventBus";
import { PostgresConnection } from "../../../../../contexts/shared/infrastructure/PostgresConnection";
import { auth } from "../../../../auth";

const validator = z.object({
	id: z.string().uuid(),
	title: z.string(),
	content: z.string(),
	areaId: z.string().uuid()
});

export async function PUT(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
): Promise<Response> {
	const session = await auth();

	if (!session?.user?.id) return new Response("Unauthorized", { status: 401 });

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
				code: "invalid_guide_id",
				message: "The guide id in the URL does not match the guide id in the body"
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
		await new GuidePoster(
			new PostgresGuideRepository(postgresConnection),
			new UserFinder(new PostgresUserRepository(postgresConnection)),
			new UCFinder(new PostgresUCRepository(postgresConnection)),
			new RabbitMQEventBus(
				new RabbitMQConnection(),
				new DomainEventFailover(postgresConnection)
			)
		).post(id, body.title, body.content, body.areaId, session.user.id);

		return new Response(null, { status: 204 });
	} catch (error) {
		if (error instanceof GuideDoesNotExist) {
			return new Response(
				JSON.stringify({ code: "guide_not_found", message: error.message }),
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
}

export async function GET(
	_: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
): Promise<Response> {
	const { id } = await params;
	const postgresConnection = new PostgresConnection();
	let guide = null;
	try {
		const guideRepository = new PostgresGuideRepository(postgresConnection);
		const guideFinder = new GuideFinder(guideRepository);
		guide = await guideFinder.find(id);
	} catch (error) {
		if (error instanceof GuideDoesNotExist) {
			return new Response(
				JSON.stringify({ code: "guide_not_found", message: error.message }),
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

	return NextResponse.json(guide.toPrimitives());
}
