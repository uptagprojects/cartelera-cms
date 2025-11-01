import { NextRequest } from "next/server";
import { z } from "zod";

import { AnnouncementContentUpdater } from "../../../../../../contexts/cma/announcements/application/update-content/AnnouncementContentUpdater";
import { AnnouncementDoesNotExistError } from "../../../../../../contexts/cma/announcements/domain/AnnouncementDoesNotExistError";
import { AnnouncementTitleIsEmptyError } from "../../../../../../contexts/cma/announcements/domain/AnnouncementTitleIsEmptyError";
import { AnnouncementTitleTooLongError } from "../../../../../../contexts/cma/announcements/domain/AnnouncementTitleTooLongError";
import { PostgresAnnouncementRepository } from "../../../../../../contexts/cma/announcements/infrastructure/PostgresAnnouncementRepository";
import { assertNever } from "../../../../../../contexts/shared/domain/assertNever";
import { InvalidIdentifierError } from "../../../../../../contexts/shared/domain/InvalidIdentifierError";
import { DomainEventFailover } from "../../../../../../contexts/shared/infrastructure/event-bus/failover/DomainEventFailover";
import { RabbitMQConnection } from "../../../../../../contexts/shared/infrastructure/event-bus/rabbitmq/RabbitMQConnection";
import { RabbitMQEventBus } from "../../../../../../contexts/shared/infrastructure/event-bus/rabbitmq/RabbitMQEventBus";
import { executeWithErrorHandling } from "../../../../../../contexts/shared/infrastructure/http/executeWithErrorHandling";
import { HTTPNextResponse } from "../../../../../../contexts/shared/infrastructure/http/HTTPNextResponse";
import { PostgresConnection } from "../../../../../../contexts/shared/infrastructure/PostgresConnection";

const validator = z.object({
    content: z.string()
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

            const postgresConnection = new PostgresConnection();

            await postgresConnection.transactional(async connection => {
                await new AnnouncementContentUpdater(
                    new PostgresAnnouncementRepository(connection as PostgresConnection),
                    new RabbitMQEventBus(
                        new RabbitMQConnection(),
                        new DomainEventFailover(connection as PostgresConnection)
                    )
                ).update(id, parsed.data.content);
            });

            return HTTPNextResponse.accepted();
        },
        (
            error:
                | InvalidIdentifierError
                | AnnouncementDoesNotExistError
                | AnnouncementTitleIsEmptyError
                | AnnouncementTitleTooLongError
        ) => {
            switch (error.type) {
                case "announcement_does_not_exist_error":
                    return HTTPNextResponse.domainError(error, 404);
                case "invalid_identifier_error":
                    return HTTPNextResponse.domainError(error, 400);
                case "announcement_title_is_empty_error":
                case "announcement_title_too_long_error":
                    return HTTPNextResponse.domainError(error, 422);
                default:
                    assertNever(error);
            }
        }
    );
}
