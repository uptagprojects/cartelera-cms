import { NextRequest } from "next/server";
import { InvalidArgumentError } from "../../../../../../contexts/shared/domain/InvalidArgumentError";
import { DomainEventFailover } from "../../../../../../contexts/shared/infrastructure/event-bus/failover/DomainEventFailover";
import { RabbitMQConnection } from "../../../../../../contexts/shared/infrastructure/event-bus/rabbitmq/RabbitMQConnection";
import { RabbitMQEventBus } from "../../../../../../contexts/shared/infrastructure/event-bus/rabbitmq/RabbitMQEventBus";
import { PostgresConnection } from "../../../../../../contexts/shared/infrastructure/PostgresConnection";
import { PostgresAnnouncementRepository } from "../../../../../../contexts/cma/announcements/infrastructure/PostgresAnnouncementRepository";
import { AnnouncementDoesNotExists } from '../../../../../../contexts/cma/announcements/domain/AnnouncementDoesNotExists';
import { AnnouncementRemover } from "../../../../../../contexts/cma/announcements/application/remove/AnnouncementRemover";

export async function DELETE(
	_request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
): Promise<Response> {
	const { id } = await params;
	const postgresConnection = new PostgresConnection();

	try {
		await new AnnouncementRemover(
			new PostgresAnnouncementRepository(postgresConnection),
			new RabbitMQEventBus(
				new RabbitMQConnection(),
				new DomainEventFailover(postgresConnection)
			)
		).remove(id);
	} catch (error) {
		if (error instanceof AnnouncementDoesNotExists) {
			return new Response(
				JSON.stringify({ code: "announcement_not_found", message: error.message }),
				{
					status: 404,
					headers: {
						"Content-Type": "application/json"
					}
				}
			);
		}

		if (error instanceof InvalidArgumentError) {
			return new Response(
				JSON.stringify({ code: "invalid_argument", message: error.message }),
				{
					status: 422,
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

	return new Response("", { status: 202 });
}
