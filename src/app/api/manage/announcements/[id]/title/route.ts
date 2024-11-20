import { NextRequest } from "next/server";
import { z } from "zod";
import { executeWithErrorHandling } from "../../../../../../contexts/shared/infrastructure/http/executeWithErrorHandling";
import { PostgresConnection } from "../../../../../../contexts/shared/infrastructure/PostgresConnection";
import { AnnouncementTitleUpdater } from "../../../../../../contexts/cma/announcements/application/update-title/AnnouncementTitleUpdater";
import { PostgresAnnouncementRepository } from "../../../../../../contexts/cma/announcements/infrastructure/PostgresAnnouncementRepository";
import { RabbitMQEventBus } from "../../../../../../contexts/shared/infrastructure/event-bus/rabbitmq/RabbitMQEventBus";
import { RabbitMQConnection } from "../../../../../../contexts/shared/infrastructure/event-bus/rabbitmq/RabbitMQConnection";
import { DomainEventFailover } from "../../../../../../contexts/shared/infrastructure/event-bus/failover/DomainEventFailover";
import { HTTPNextResponse } from "../../../../../../contexts/shared/infrastructure/http/HTTPNextResponse";
import { InvalidIdentifierError } from "../../../../../../contexts/shared/domain/InvalidIdentifierError";
import { assertNever } from "../../../../../../contexts/shared/domain/assertNever";
import { AnnouncementDoesNotExistError } from "../../../../../../contexts/cma/announcements/domain/AnnouncementDoesNotExistError";
import { AnnouncementTitleIsEmptyError } from "../../../../../../contexts/cma/announcements/domain/AnnouncementTitleIsEmptyError";
import { AnnouncementTitleTooLongError } from "../../../../../../contexts/cma/announcements/domain/AnnouncementTitleTooLongError";

const validator = z.object({
	title: z.string().url()
});

export async function PUT(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
): Promise<Response> {

    return executeWithErrorHandling(async () => {
        const { id } = await params;
        const json = await request.json();
        const parsed = validator.safeParse(json);

        if(!parsed.success) {
            throw parsed.error.message;
        }

        const postgresConnection = new PostgresConnection();

        await postgresConnection.transactional(
            async (connection) => {
                await new AnnouncementTitleUpdater(
                    new PostgresAnnouncementRepository(connection as PostgresConnection),
                    new RabbitMQEventBus(
                        new RabbitMQConnection(),
                        new DomainEventFailover(connection as PostgresConnection)
                    )
                ).update(id, parsed.data.title);
            }
        );
        return HTTPNextResponse.accepted();
    }, (
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
    });
}
