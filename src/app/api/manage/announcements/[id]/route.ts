import { NextRequest } from "next/server";
import { z } from "zod";

import { AnnouncementFinder } from "../../../../../contexts/cma/announcements/application/find/AnnouncementFinder";
import {
	AnnouncementPoster,
	AnnouncementPosterErrors
} from "../../../../../contexts/cma/announcements/application/post/AnnouncementPoster";
import { AnnouncementDoesNotExistError } from "../../../../../contexts/cma/announcements/domain/AnnouncementDoesNotExistError";
import { PostgresAnnouncementRepository } from "../../../../../contexts/cma/announcements/infrastructure/PostgresAnnouncementRepository";
import { assertNever } from "../../../../../contexts/shared/domain/assertNever";
import { InvalidArgumentError } from "../../../../../contexts/shared/domain/InvalidArgumentError";
import { DomainEventFailover } from "../../../../../contexts/shared/infrastructure/event-bus/failover/DomainEventFailover";
import { RabbitMQConnection } from "../../../../../contexts/shared/infrastructure/event-bus/rabbitmq/RabbitMQConnection";
import { RabbitMQEventBus } from "../../../../../contexts/shared/infrastructure/event-bus/rabbitmq/RabbitMQEventBus";
import { executeWithErrorHandling } from "../../../../../contexts/shared/infrastructure/http/executeWithErrorHandling";
import { HTTPNextResponse } from "../../../../../contexts/shared/infrastructure/http/HTTPNextResponse";
import { PostgresConnection } from "../../../../../contexts/shared/infrastructure/PostgresConnection";

const validator = z.object({
	id: z.string().uuid(),
	title: z.string(),
	type: z.enum(["info", "warning", "success"]),
	content: z.string()
});

export async function PUT(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
): Promise<Response> {
	return executeWithErrorHandling(
		async () => {
			const { id } = await params;
			const json = await request.json();
			const parsed = validator.safeParse(json);
			if (!parsed.success) {
				throw new InvalidArgumentError(parsed.error.message);
			}

			const body = parsed.data;
			const postgresConnection = new PostgresConnection();

			await new AnnouncementPoster(
				new PostgresAnnouncementRepository(postgresConnection),
				new RabbitMQEventBus(
					new RabbitMQConnection(),
					new DomainEventFailover(postgresConnection)
				)
			).post(id, body.title, body.type, body.content);

			return HTTPNextResponse.created();
		},
		(error: AnnouncementPosterErrors) => {
			switch (error.type) {
				case "invalid_identifier_error":
				case "invalid_argument_error":
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
	return executeWithErrorHandling(
		async () => {
			const { id } = await params;
			const postgresConnection = new PostgresConnection();
			const announcementRepository = new PostgresAnnouncementRepository(postgresConnection);
			const announcementFinder = new AnnouncementFinder(announcementRepository);
			const announcement = await announcementFinder.find(id);

			return HTTPNextResponse.json(announcement);
		},
		(error: AnnouncementDoesNotExistError) => {
			return HTTPNextResponse.domainError(error, 404);
		}
	);
}
