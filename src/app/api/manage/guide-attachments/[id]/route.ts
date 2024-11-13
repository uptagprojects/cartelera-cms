import { NextRequest, NextResponse } from "next/server";

import { GuideAttachmentUploader } from "../../../../../contexts/cma/guide-attachments/application/upload/GuideAttachmentUploader";
import { PostgresGuideAttachmentRepository } from "../../../../../contexts/cma/guide-attachments/infrastructure/PostgresGuideAttachmentRepository";
import { DomainEventFailover } from "../../../../../contexts/shared/infrastructure/event-bus/failover/DomainEventFailover";
import { RabbitMQConnection } from "../../../../../contexts/shared/infrastructure/event-bus/rabbitmq/RabbitMQConnection";
import { RabbitMQEventBus } from "../../../../../contexts/shared/infrastructure/event-bus/rabbitmq/RabbitMQEventBus";
import { DropboxConnection } from "../../../../../contexts/shared/infrastructure/file-storage/dropbox/DropboxConnection";
import { DropboxFileStorage } from "../../../../../contexts/shared/infrastructure/file-storage/dropbox/DropboxFileStorage";
import { PostgresConnection } from "../../../../../contexts/shared/infrastructure/PostgresConnection";

export async function PUT(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> {
	const { id } = await params;
	const formData = await request.formData();
	const guideId = formData.get("guide_id") as string;
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

	await uploader.upload(id, guideId, file);

	return NextResponse.json({}, { status: 202 });
}
