import { Criteria } from "../../../shared/domain/criteria/Criteria";
import { CriteriaToPostgresSqlConverter } from "../../../shared/infrastructure/criteria/CriteriaToPostgresSqlConverter";
import { PostgresConnection } from "../../../shared/infrastructure/PostgresConnection";
import { Announcement } from "../domain/Announcement";
import { AnnouncementId } from "../domain/AnnouncementId";
import { AnnouncementRepository } from "../domain/AnnouncementRepository";

interface DatabaseAnnouncement {
	id: string;
	title: string;
	content: string;
	publishDate: string;
	type: string;
	active: boolean;
}
export class PostgresAnnouncementRepository implements AnnouncementRepository {
	constructor(private readonly connection: PostgresConnection) { }

	async save(announcement: Announcement): Promise<void> {
		const announcementPrimitives = announcement.toPrimitives();

		const params = [announcementPrimitives.id, announcementPrimitives.title, announcementPrimitives.content, announcementPrimitives.publishDate, announcementPrimitives.type, announcementPrimitives.active];

		await this.connection.execute(
			`INSERT INTO cma__announcements (id, title, content, publish_date, type, active) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT (id) DO UPDATE SET title = $2`,
			params
		);
	}

	async search(id: AnnouncementId): Promise<Announcement | null> {
		const res = await this.connection.searchOne<DatabaseAnnouncement>(
			"SELECT id, title, content, publish_date, type, active FROM cma__announcements WHERE id = $1 LIMIT 1",
			[id.value]
		);

		if (!res) {
			return null;
		}

		return Announcement.fromPrimitives({
			id: res.id,
			title: res.title,
			content: res.content,
			publishDate: res.publishDate,
			type: res.type,
			active: res.active
		});
	}

	async searchAll(): Promise<Announcement[]> {
		const res = await this.connection.searchAll<DatabaseAnnouncement>(
			"SELECT id, title, content, publish_date, type, active FROM cma__announcements",
			[]
		);

		return res.map(r => Announcement.fromPrimitives(r));
	}

	async matching(criteria: Criteria): Promise<Announcement[]> {
		const converter = new CriteriaToPostgresSqlConverter();
		const { query, params } = converter.convert(
			["id", "title", "content", "publish_date AS publishDate", "type", "active"],
			"cda__announcements",
			criteria
		);

		const results = await this.connection.searchAll<DatabaseAnnouncement>(query, params);

		return results.map(a =>
			Announcement.fromPrimitives({
				id: a.id,
				title: a.title,
				content: a.content,
				publishDate: a.publishDate,
				type: a.type,
				active: a.active
			})
		);
	}

	async remove(announcement: Announcement): Promise<void> {
		const { id } = announcement.toPrimitives();

		await this.connection.execute(
			"DELETE FROM cma__announcements WHERE id = $1",
			[id]
		);
	}


}
