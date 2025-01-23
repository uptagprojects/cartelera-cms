import { NextRequest, NextResponse } from "next/server";

import { GuideAttachmentUploader } from "../../../../../../../contexts/cma/guide-attachments/application/upload/GuideAttachmentUploader";
import { PostgresGuideAttachmentRepository } from "../../../../../../../contexts/cma/guide-attachments/infrastructure/PostgresGuideAttachmentRepository";
import { DomainEventFailover } from "../../../../../../../contexts/shared/infrastructure/event-bus/failover/DomainEventFailover";
import { RabbitMQConnection } from "../../../../../../../contexts/shared/infrastructure/event-bus/rabbitmq/RabbitMQConnection";
import { RabbitMQEventBus } from "../../../../../../../contexts/shared/infrastructure/event-bus/rabbitmq/RabbitMQEventBus";
import { PostgresConnection } from "../../../../../../../contexts/shared/infrastructure/PostgresConnection";
import { DropboxFileStorage } from "../../../../../../../contexts/shared/infrastructure/file-storage/dropbox/DropboxFileStorage";
import { DropboxConnection } from ".../../../../../../../contexts/shared/infrastructure/shared-file-storage/DropboxFileStorage

export async function PUT(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string; attachmentId: string }> }
): Promise<NextResponse> {
	const { id: guideId, attachmentId } = await params;
	const formData = await request.formData();
	const file = formData.get("file") as File | null;

	if (!guideId) {
		return NextResponse.json({ error: "No guide received." }, { status: 400 });
	}

	if (!file) {
		return NextResponse.json({ error: "No files received." }, { status: 400 });
	}

	const postgresConnection = new PostgresConnection();
	const uploader = new GuideAttachmentUploader(
		new PostgresGuideAttachmentRepository(postgresConnection),
		new DropboxFileStorage(new DropboxConnection()),
		new RabbitMQEventBus(new RabbitMQConnection(), new DomainEventFailover(postgresConnection))
	);

	await uploader.upload(attachmentId, guideId, file);

	return NextResponse.json({}, { status: 202 });
}
