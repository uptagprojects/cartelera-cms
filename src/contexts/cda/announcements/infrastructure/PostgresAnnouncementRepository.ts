import { PostgresConnection } from "../../../shared/infrastructure/PostgresConnection";
import { Announcement } from "../domain/Announcement";
import { AnnouncementId } from "../domain/AnnouncementId";
import { AnnouncementRepository } from "../domain/AnnouncementRepository";

interface DatabaseAnnouncement {
	id: string;
	title: string;
	content: string;
	type: string;
}

export class PostgresAnnouncementRepository implements AnnouncementRepository {
	constructor(private readonly connection: PostgresConnection) {}

	async save(announcement: Announcement): Promise<void> {
		const primitives = announcement.toPrimitives();
		await this.connection.execute(
			"INSERT INTO cda__announcements (id, title, content, type) VALUES ($1, $2, $3, $4)",
			[
				announcement.id.value,
				primitives.title,
				primitives.content,
				primitives.type
			]
		);
	}

	async search(id: AnnouncementId): Promise<Announcement | null> {
		const res = await this.connection.searchOne<DatabaseAnnouncement>(
			"SELECT id, title, content, type FROM cda__announcements WHERE id = $1 LIMIT 1",
			[id.value]
		);

		if (!res) {
			return null;
		}

		return Announcement.fromPrimitives({
			id: res.id,
			title: res.title,
			content: res.content,
			type: res.type
		});
	}

	async searchAll(): Promise<Announcement[]> {
		const results = await this.connection.searchAll<DatabaseAnnouncement>(
			"SELECT id, title, content, type FROM cda__announcements ORDER BY stored_creation_timestamp",
		);

		return results.map(a =>
			Announcement.fromPrimitives({
				id: a.id,
				title: a.title,
				content: a.content,
				type: a.type
			})
		);
	}

	async remove(announcement: Announcement): Promise<void> {
		await this.connection.execute("DELETE FROM cda__announcements WHERE id = $1", [announcement.id.value]);
	}
}
