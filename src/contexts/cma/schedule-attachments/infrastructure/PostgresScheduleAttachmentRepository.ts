import { PostgresConnection } from "../../../shared/infrastructure/PostgresConnection";
import { ScheduleId } from "../../schedules/domain/ScheduleId";
import { ScheduleAttachment } from "../domain/ScheduleAttachment";
import { ScheduleAttachmentId } from "../domain/ScheduleAttachmentId";
import { ScheduleAttachmentRepository } from "../domain/ScheduleAttachmentRepository";

type DatabaseScheduleAttachment = {
	id: string;
	name: string;
	schedule_id: string;
	url: string;
	size: number;
	mime_type: string;
	storage_path: string;
};

export class PostgresScheduleAttachmentRepository implements ScheduleAttachmentRepository {
	constructor(private readonly connection: PostgresConnection) {}

	async save(scheduleAttachment: ScheduleAttachment): Promise<void> {
		const primitives = scheduleAttachment.toPrimitives();
		await this.connection.execute(
			"INSERT INTO cma__schedule_attachments (id, name, schedule_id, url, size, mime_type, storage_path) VALUES ($1, $2, $3, $4, $5, $6, $7) ON CONFLICT (id) DO UPDATE SET name=$2",
			[
				primitives.id,
				primitives.name,
				primitives.scheduleId,
				primitives.url,
				primitives.size,
				primitives.mimeType,
				primitives.storagePath
			]
		);
	}

	async search(id: ScheduleAttachmentId): Promise<ScheduleAttachment | null> {
		const result = await this.connection.searchOne<DatabaseScheduleAttachment>(
			"SELECT id, name, schedule_id, url, size, mime_type, storage_path FROM cma__schedule_attachments WHERE id = $1",
			[id.value]
		);

		if (!result) {
			return null;
		}

		return ScheduleAttachment.fromPrimitives({
			id: result.id,
			name: result.name,
			scheduleId: result.schedule_id,
			url: result.url,
			size: result.size,
			mimeType: result.mime_type,
			storagePath: result.storage_path
		});
	}

	async searchAllByScheduleId(scheduleId: ScheduleId): Promise<ScheduleAttachment[]> {
		const res = await this.connection.searchAll<DatabaseScheduleAttachment>(
			"SELECT id, name, schedule_id, url, size, mime_type, storage_path FROM cma__schedule_attachments WHERE schedule_id = $1",
			[scheduleId.value]
		);

		return res.map(result =>
			ScheduleAttachment.fromPrimitives({
				id: result.id,
				name: result.name,
				scheduleId: result.schedule_id,
				url: result.url,
				size: result.size,
				mimeType: result.mime_type,
				storagePath: result.storage_path
			})
		);
	}

	async remove(scheduleAttachment: ScheduleAttachment): Promise<void> {
		const { id } = scheduleAttachment.toPrimitives();

		await this.connection.execute("DELETE FROM cma__schedule_attachments WHERE id = $1", [id]);
	}
}
