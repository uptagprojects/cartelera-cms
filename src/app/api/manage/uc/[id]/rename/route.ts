import { NextRequest } from "next/server";
import { z } from "zod";

import { UCRenamer } from "../../../../../../contexts/cma/uc/application/rename/UCRenamer";
import { UCDoesNotExistError } from "../../../../../../contexts/cma/uc/domain/UCDoesNotExistError";
import { UCNameIsEmptyError } from "../../../../../../contexts/cma/uc/domain/UCNameIsEmptyError";
import { UCNameTooLongError } from "../../../../../../contexts/cma/uc/domain/UCNameTooLongError";
import { PostgresUCRepository } from "../../../../../../contexts/cma/uc/infrastructure/PostgresUCRepository";
import { assertNever } from "../../../../../../contexts/shared/domain/assertNever";
import { InvalidIdentifierError } from "../../../../../../contexts/shared/domain/InvalidIdentifierError";
import { DomainEventFailover } from "../../../../../../contexts/shared/infrastructure/event-bus/failover/DomainEventFailover";
import { RabbitMQConnection } from "../../../../../../contexts/shared/infrastructure/event-bus/rabbitmq/RabbitMQConnection";
import { RabbitMQEventBus } from "../../../../../../contexts/shared/infrastructure/event-bus/rabbitmq/RabbitMQEventBus";
import { executeWithErrorHandling } from "../../../../../../contexts/shared/infrastructure/http/executeWithErrorHandling";
import { HTTPNextResponse } from "../../../../../../contexts/shared/infrastructure/http/HTTPNextResponse";
import { PostgresConnection } from "../../../../../../contexts/shared/infrastructure/PostgresConnection";

const validator = z.object({
	name: z.string()
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
				return HTTPNextResponse.validationError(parsed.error, 422);
			}

			const postgresConnection = new PostgresConnection();

			await postgresConnection.transactional(async connection => {
				await new UCRenamer(
					new PostgresUCRepository(connection as PostgresConnection),
					new RabbitMQEventBus(
						new RabbitMQConnection(),
						new DomainEventFailover(connection as PostgresConnection)
					)
				).rename(id, parsed.data.name);
			});

			return HTTPNextResponse.accepted();
		},
		(
			error:
				| InvalidIdentifierError
				| UCDoesNotExistError
				| UCNameIsEmptyError
				| UCNameTooLongError
		) => {
			switch (error.type) {
				case "uc_does_not_exist_error":
					return HTTPNextResponse.domainError(error, 404);
				case "invalid_identifier_error":
					return HTTPNextResponse.domainError(error, 400);
				case "uc_name_is_empty_error":
				case "uc_name_too_long_error":
					return HTTPNextResponse.domainError(error, 422);
				default:
					assertNever(error);
			}
		}
	);
}
