import { NextRequest } from "next/server";

import { AnnouncementArchiver } from "../../../../../../contexts/cma/announcements/application/archive/AnnouncementArchiver";
import { AnnouncementDoesNotExistError } from "../../../../../../contexts/cma/announcements/domain/AnnouncementDoesNotExistError";
import { AnnouncementIsArchivedError } from "../../../../../../contexts/cma/announcements/domain/AnnouncementIsArchivedError";
import { PostgresAnnouncementRepository } from "../../../../../../contexts/cma/announcements/infrastructure/PostgresAnnouncementRepository";
import { assertNever } from "../../../../../../contexts/shared/domain/assertNever";
import { InvalidIdentifierError } from "../../../../../../contexts/shared/domain/InvalidIdentifierError";
import { DomainEventFailover } from "../../../../../../contexts/shared/infrastructure/event-bus/failover/DomainEventFailover";
import { RabbitMQConnection } from "../../../../../../contexts/shared/infrastructure/event-bus/rabbitmq/RabbitMQConnection";
import { RabbitMQEventBus } from "../../../../../../contexts/shared/infrastructure/event-bus/rabbitmq/RabbitMQEventBus";
import { executeWithErrorHandling } from "../../../../../../contexts/shared/infrastructure/http/executeWithErrorHandling";
import { HTTPNextResponse } from "../../../../../../contexts/shared/infrastructure/http/HTTPNextResponse";
import { PostgresConnection } from "../../../../../../contexts/shared/infrastructure/PostgresConnection";

export async function PUT(
	_request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
): Promise<Response> {
	return executeWithErrorHandling(
		async () => {
			const { id } = await params;
			const connection = new PostgresConnection();

			await connection.transactional(async () => {
				await new AnnouncementArchiver(
					new PostgresAnnouncementRepository(connection),
					new RabbitMQEventBus(
						new RabbitMQConnection(),
						new DomainEventFailover(connection)
					)
				).archive(id);
			});

			return HTTPNextResponse.accepted();
		},
		(
			error:
				| InvalidIdentifierError
				| AnnouncementDoesNotExistError
				| AnnouncementIsArchivedError
		) => {
			switch (error.type) {
				case "announcement_does_not_exist_error":
					return HTTPNextResponse.domainError(error, 404);
				case "invalid_identifier_error":
				case "announcement_is_archived_error":
					return HTTPNextResponse.domainError(error, 400);
				default:
					assertNever(error);
			}
		}
	);
}
