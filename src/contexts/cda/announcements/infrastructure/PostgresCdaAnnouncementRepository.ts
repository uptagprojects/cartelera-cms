import { Service } from "diod";

import { PostgresConnection } from "../../../shared/infrastructure/PostgresConnection";
import { CdaAnnouncement } from "../domain/CdaAnnouncement";
import { CdaAnnouncementId } from "../domain/CdaAnnouncementId";
import { CdaAnnouncementRepository } from "../domain/CdaAnnouncementRepository";

interface DatabaseAnnouncement {
	id: string;
	title: string;
	content: string;
	type: string;
}

@Service()
export class PostgresCdaAnnouncementRepository implements CdaAnnouncementRepository {
	constructor(private readonly connection: PostgresConnection) {}

	async save(announcement: CdaAnnouncement): Promise<void> {
		const primitives = announcement.toPrimitives();
		await this.connection.execute(
			"INSERT INTO cda__announcements (id, title, content, type) VALUES ($1, $2, $3, $4) ON CONFLICT (id) DO UPDATE SET title=$2, content=$3, type=$4",
			[announcement.id.value, primitives.title, primitives.content, primitives.type]
		);
	}

	async search(id: CdaAnnouncementId): Promise<CdaAnnouncement | null> {
		const res = await this.connection.searchOne<DatabaseAnnouncement>(
			"SELECT id, title, content, type FROM cda__announcements WHERE id = $1 LIMIT 1",
			[id.value]
		);

		if (!res) {
			return null;
		}

		return CdaAnnouncement.fromPrimitives({
			id: res.id,
			title: res.title,
			content: res.content,
			type: res.type
		});
	}

	async searchAll(): Promise<CdaAnnouncement[]> {
		const results = await this.connection.searchAll<DatabaseAnnouncement>(
			"SELECT id, title, content, type FROM cda__announcements ORDER BY stored_creation_timestamp"
		);

		return results.map(a =>
			CdaAnnouncement.fromPrimitives({
				id: a.id,
				title: a.title,
				content: a.content,
				type: a.type
			})
		);
	}

	async remove(announcement: CdaAnnouncement): Promise<void> {
		await this.connection.execute("DELETE FROM cda__announcements WHERE id = $1", [
			announcement.id.value
		]);
	}
}
