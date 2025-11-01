import { NextRequest } from "next/server";
import { z } from "zod";

import { UCCreator, UCCreatorErrors } from "../../../../../contexts/cma/uc/application/create/UCCreator";
import { UCFinder } from "../../../../../contexts/cma/uc/application/find/UCFinder";
import { UCDoesNotExistError } from "../../../../../contexts/cma/uc/domain/UCDoesNotExistError";
import { PostgresUCRepository } from "../../../../../contexts/cma/uc/infrastructure/PostgresUCRepository";
import { assertNever } from "../../../../../contexts/shared/domain/assertNever";
import { DomainEventFailover } from "../../../../../contexts/shared/infrastructure/event-bus/failover/DomainEventFailover";
import { RabbitMQConnection } from "../../../../../contexts/shared/infrastructure/event-bus/rabbitmq/RabbitMQConnection";
import { RabbitMQEventBus } from "../../../../../contexts/shared/infrastructure/event-bus/rabbitmq/RabbitMQEventBus";
import { executeWithErrorHandling } from "../../../../../contexts/shared/infrastructure/http/executeWithErrorHandling";
import { HTTPNextResponse } from "../../../../../contexts/shared/infrastructure/http/HTTPNextResponse";
import { PostgresConnection } from "../../../../../contexts/shared/infrastructure/PostgresConnection";

const validator = z.object({
    id: z.string().uuid(),
    name: z.string()
});

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }): Promise<Response> {
    return executeWithErrorHandling(
        async () => {
            const { id } = await params;
            const json = await request.json();
            const parsed = validator.safeParse(json);

            if (!parsed.success) {
                return HTTPNextResponse.validationError(parsed.error, 422);
            }

            const body = parsed.data;
            const postgresConnection = new PostgresConnection();

            await postgresConnection.transactional(async connection => {
                await new UCCreator(
                    new PostgresUCRepository(connection as PostgresConnection),
                    new RabbitMQEventBus(
                        new RabbitMQConnection(),
                        new DomainEventFailover(connection as PostgresConnection)
                    )
                ).create(id, body.name);
            });

            return HTTPNextResponse.created();
        },
        (error: UCCreatorErrors) => {
            switch (error.type) {
                case "invalid_identifier_error":
                case "uc_name_is_empty_error":
                case "uc_name_too_long_error":
                    return HTTPNextResponse.domainError(error, 422);
                default:
                    assertNever(error);
            }
        }
    );
}

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }): Promise<Response> {
    return executeWithErrorHandling(
        async () => {
            const { id } = await params;
            const postgresConnection = new PostgresConnection();
            const uc = await new UCFinder(new PostgresUCRepository(postgresConnection)).find(id);

            return HTTPNextResponse.json(uc);
        },
        (error: UCDoesNotExistError) => {
            return HTTPNextResponse.domainError(error, 404);
        }
    );
}
