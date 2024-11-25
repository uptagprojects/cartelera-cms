import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { GuideFinder } from "../../../../../contexts/cma/guides/application/find/GuideFinder";
import {
	GuidePoster,
	GuidePosterErrors
} from "../../../../../contexts/cma/guides/application/post/GuidePoster";
import { GuideDoesNotExist } from "../../../../../contexts/cma/guides/domain/GuideDoesNotExist";
import { PostgresGuideRepository } from "../../../../../contexts/cma/guides/infrastructure/PostgresGuideRepository";
import { UCFinder } from "../../../../../contexts/cma/uc/application/find/UCFinder";
import { PostgresUCRepository } from "../../../../../contexts/cma/uc/infrastructure/PostgresUCRepository";
import {
	UserEmailFinder,
	UserEmailFinderErrors
} from "../../../../../contexts/cma/users/application/find-by-email/UserEmailFinder";
import { UserFinder } from "../../../../../contexts/cma/users/domain/UserFinder";
import { PostgresUserRepository } from "../../../../../contexts/cma/users/infrastructure/PostgresUserRepository";
import { assertNever } from "../../../../../contexts/shared/domain/assertNever";
import { DomainEventFailover } from "../../../../../contexts/shared/infrastructure/event-bus/failover/DomainEventFailover";
import { RabbitMQConnection } from "../../../../../contexts/shared/infrastructure/event-bus/rabbitmq/RabbitMQConnection";
import { RabbitMQEventBus } from "../../../../../contexts/shared/infrastructure/event-bus/rabbitmq/RabbitMQEventBus";
import { executeWithErrorHandling } from "../../../../../contexts/shared/infrastructure/http/executeWithErrorHandling";
import { HTTPNextResponse } from "../../../../../contexts/shared/infrastructure/http/HTTPNextResponse";
import { PostgresConnection } from "../../../../../contexts/shared/infrastructure/PostgresConnection";
import { auth } from "../../../../../lib/auth";

const validator = z.object({
	id: z.string().uuid(),
	title: z.string(),
	content: z.string(),
	ucId: z.string().uuid()
});

export async function PUT(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
): Promise<Response> {
	return executeWithErrorHandling(
		async () => {
			const { id } = await params;
			const session = await auth();

			if (!session?.user?.email) {
				return HTTPNextResponse.unauthorizedError();
			}

			const pgConnection = new PostgresConnection();
			const userRepository = new PostgresUserRepository(pgConnection);

			const user = await new UserEmailFinder(userRepository).find(session.user.email);

			const json = await request.json();
			const parsed = validator.safeParse(json);
			if (!parsed.success) {
				return HTTPNextResponse.validationError(parsed.error, 422);
			}

			const body = parsed.data;

			await pgConnection.transactional(async () => {
				await new GuidePoster(
					new PostgresGuideRepository(pgConnection),
					new UserFinder(userRepository),
					new UCFinder(new PostgresUCRepository(pgConnection)),
					new RabbitMQEventBus(
						new RabbitMQConnection(),
						new DomainEventFailover(pgConnection)
					)
				).post(id, body.title, body.content, body.ucId, user.id);
			});

			return HTTPNextResponse.created();
		},
		(error: GuidePosterErrors | UserEmailFinderErrors) => {
			switch (error.type) {
				case "user_does_not_exist_error":
				case "user_email_is_not_valid_error":
				case "user_is_not_active_error":
					return HTTPNextResponse.domainError(error, 403);
				case "invalid_identifier_error":
					return HTTPNextResponse.domainError(error, 400);
				case "invalid_argument_error":
				case "guide_title_is_empty_error":
				case "guide_title_too_long_error":
				case "guide_content_is_empty_error":
				case "uc_does_not_exist_error":
					return HTTPNextResponse.domainError(error, 422);
				default:
					assertNever(error);
			}
		}
	);
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
