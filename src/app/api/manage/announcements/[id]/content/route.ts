import { NextRequest } from "next/server";
import { z } from "zod";

import { InvalidArgumentError } from "../../../../../../contexts/shared/domain/InvalidArgumentError";
import { DomainEventFailover } from "../../../../../../contexts/shared/infrastructure/event-bus/failover/DomainEventFailover";
import { RabbitMQConnection } from "../../../../../../contexts/shared/infrastructure/event-bus/rabbitmq/RabbitMQConnection";
import { RabbitMQEventBus } from "../../../../../../contexts/shared/infrastructure/event-bus/rabbitmq/RabbitMQEventBus";
import { PostgresConnection } from "../../../../../../contexts/shared/infrastructure/PostgresConnection";
import { AnnouncementContentUpdater } from "../../../../../../contexts/cma/announcements/application/update-content/AnnouncementContentUpdater";
import { PostgresAnnouncementRepository } from "../../../../../../contexts/cma/announcements/infrastructure/PostgresAnnouncementRepository";
import { AnnouncementDoesNotExists } from '../../../../../../contexts/cma/announcements/domain/AnnouncementDoesNotExists';

const validator = z.object({
	content: z.string()
});

export async function PUT(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
): Promise<Response> {
	const { id } = await params;
	const json = await request.json();
	const parsed = validator.safeParse(json);

	if (!parsed.success) {
		return new Response(JSON.stringify({ message: parsed.error.message }), {
			status: 422,
			headers: {
				"Content-Type": "application/json"
			}
		});
	}

	const postgresConnection = new PostgresConnection();

	try {
		await new AnnouncementContentUpdater(
			new PostgresAnnouncementRepository(postgresConnection),
			new RabbitMQEventBus(
				new RabbitMQConnection(),
				new DomainEventFailover(postgresConnection)
			)
		).update(id, parsed.data.content);
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
