import { NextRequest } from "next/server";

import { UCRemover } from "../../../../../../contexts/cma/uc/application/remove/UCRemover";
import { UCDoesNotExistError } from "../../../../../../contexts/cma/uc/domain/UCDoesNotExistError";
import { PostgresUCRepository } from "../../../../../../contexts/cma/uc/infrastructure/PostgresUCRepository";
import { assertNever } from "../../../../../../contexts/shared/domain/assertNever";
import { InvalidIdentifierError } from "../../../../../../contexts/shared/domain/InvalidIdentifierError";
import { DomainEventFailover } from "../../../../../../contexts/shared/infrastructure/event-bus/failover/DomainEventFailover";
import { RabbitMQConnection } from "../../../../../../contexts/shared/infrastructure/event-bus/rabbitmq/RabbitMQConnection";
import { RabbitMQEventBus } from "../../../../../../contexts/shared/infrastructure/event-bus/rabbitmq/RabbitMQEventBus";
import { executeWithErrorHandling } from "../../../../../../contexts/shared/infrastructure/http/executeWithErrorHandling";
import { HTTPNextResponse } from "../../../../../../contexts/shared/infrastructure/http/HTTPNextResponse";
import { PostgresConnection } from "../../../../../../contexts/shared/infrastructure/PostgresConnection";

export async function DELETE(
	_request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
): Promise<Response> {
	return executeWithErrorHandling(
		async () => {
			const { id } = await params;
			const connection = new PostgresConnection();

			await connection.transactional(async () => {
				await new UCRemover(
					new PostgresUCRepository(connection),
					new RabbitMQEventBus(
						new RabbitMQConnection(),
						new DomainEventFailover(connection)
					)
				).remove(id);
			});

			return HTTPNextResponse.deleted();
		},
		(error: InvalidIdentifierError | UCDoesNotExistError) => {
			switch (error.type) {
				case "uc_does_not_exist_error":
					return HTTPNextResponse.domainError(error, 404);
				case "invalid_identifier_error":
					return HTTPNextResponse.domainError(error, 400);
				default:
					assertNever(error);
			}
		}
	);
}
