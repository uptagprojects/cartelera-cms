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
	constructor(private readonly connection: PostgresConnection) {}

	async search(id: AnnouncementId): Promise<Announcement | null> {
		const res = await this.connection.searchOne<DatabaseAnnouncement>(
			"SELECT id, title, content, publish_date, type, active FROM cda__announcements WHERE id = $1 LIMIT 1",
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
}
