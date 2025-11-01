import { NextRequest, NextResponse } from "next/server";

import { ScheduleAttachmentUploader } from "../../../../../../../contexts/cma/schedule-attachments/application/upload/ScheduleAttachmentUploader";
import { PostgresScheduleAttachmentRepository } from "../../../../../../../contexts/cma/schedule-attachments/infrastructure/PostgresScheduleAttachmentRepository";
import { DomainEventFailover } from "../../../../../../../contexts/shared/infrastructure/event-bus/failover/DomainEventFailover";
import { RabbitMQConnection } from "../../../../../../../contexts/shared/infrastructure/event-bus/rabbitmq/RabbitMQConnection";
import { RabbitMQEventBus } from "../../../../../../../contexts/shared/infrastructure/event-bus/rabbitmq/RabbitMQEventBus";
import { DropboxConnection } from "../../../../../../../contexts/shared/infrastructure/file-storage/dropbox/DropboxConnection";
import { DropboxFileStorage } from "../../../../../../../contexts/shared/infrastructure/file-storage/dropbox/DropboxFileStorage";
import { PostgresConnection } from "../../../../../../../contexts/shared/infrastructure/PostgresConnection";

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string; attachmentId: string }> }
): Promise<NextResponse> {
    const { id: scheduleId, attachmentId } = await params;
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!scheduleId) {
        return NextResponse.json({ error: "No schedule received." }, { status: 400 });
    }

    if (!file) {
        return NextResponse.json({ error: "No files received." }, { status: 400 });
    }

    const postgresConnection = new PostgresConnection();
    const uploader = new ScheduleAttachmentUploader(
        new PostgresScheduleAttachmentRepository(postgresConnection),
        new DropboxFileStorage(new DropboxConnection()),
        new RabbitMQEventBus(new RabbitMQConnection(), new DomainEventFailover(postgresConnection))
    );

    await uploader.upload(attachmentId, scheduleId, file);

    return NextResponse.json({}, { status: 202 });
}
