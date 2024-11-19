import { NextRequest } from "next/server";

import { GuideAttachmentRemover } from "../../../../../../../../contexts/cma/guide-attachments/application/remove/GuideAttachmentRemover";
import { GuideAttachmentDoesNotExist } from "../../../../../../../../contexts/cma/guide-attachments/domain/GuideAttachmentDoesNotExist";
import { PostgresGuideAttachmentRepository } from "../../../../../../../../contexts/cma/guide-attachments/infrastructure/PostgresGuideAttachmentRepository";
import { InvalidArgumentError } from "../../../../../../../../contexts/shared/domain/InvalidArgumentError";
import { DomainEventFailover } from "../../../../../../../../contexts/shared/infrastructure/event-bus/failover/DomainEventFailover";
import { RabbitMQConnection } from "../../../../../../../../contexts/shared/infrastructure/event-bus/rabbitmq/RabbitMQConnection";
import { RabbitMQEventBus } from "../../../../../../../../contexts/shared/infrastructure/event-bus/rabbitmq/RabbitMQEventBus";
import { DropboxConnection } from "../../../../../../../../contexts/shared/infrastructure/file-storage/dropbox/DropboxConnection";
import { DropboxFileStorage } from "../../../../../../../../contexts/shared/infrastructure/file-storage/dropbox/DropboxFileStorage";
import { PostgresConnection } from "../../../../../../../../contexts/shared/infrastructure/PostgresConnection";

export async function DELETE(
	_request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
): Promise<Response> {
	const { id } = await params;
	const postgresConnection = new PostgresConnection();

	try {
		await new GuideAttachmentRemover(
			new PostgresGuideAttachmentRepository(postgresConnection),
			new DropboxFileStorage(new DropboxConnection()),
			new RabbitMQEventBus(
				new RabbitMQConnection(),
				new DomainEventFailover(postgresConnection)
			)
		).remove(id);
	} catch (error) {
		if (error instanceof GuideAttachmentDoesNotExist) {
			return new Response(
				JSON.stringify({ code: "guide_attachment_not_found", message: error.message }),
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
