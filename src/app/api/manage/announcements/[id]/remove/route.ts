import { NextRequest } from "next/server";

import { AnnouncementRemover } from "../../../../../../contexts/cma/announcements/application/remove/AnnouncementRemover";
import { AnnouncementDoesNotExistError } from "../../../../../../contexts/cma/announcements/domain/AnnouncementDoesNotExistError";
import { PostgresAnnouncementRepository } from "../../../../../../contexts/cma/announcements/infrastructure/PostgresAnnouncementRepository";
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
                await new AnnouncementRemover(
                    new PostgresAnnouncementRepository(connection),
                    new RabbitMQEventBus(new RabbitMQConnection(), new DomainEventFailover(connection))
                ).remove(id);
            });

            return HTTPNextResponse.deleted();
        },
        (error: InvalidIdentifierError | AnnouncementDoesNotExistError) => {
            switch (error.type) {
                case "announcement_does_not_exist_error":
                    return HTTPNextResponse.domainError(error, 404);
                case "invalid_identifier_error":
                    return HTTPNextResponse.domainError(error, 400);
                default:
                    assertNever(error);
            }
        }
    );
}
