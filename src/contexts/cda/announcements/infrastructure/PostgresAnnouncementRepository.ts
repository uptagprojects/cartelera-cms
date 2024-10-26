import { Criteria } from "../../../shared/domain/criteria/Criteria";
import { CriteriaToSqlConverter } from "../../../shared/infrastructure/criteria/CriteriaToSqlConverter";
import { PostgresConnection } from "../../../shared/infrastructure/PostgresConnection";
import { AttachmentPrimitives } from "../../attachments/domain/Attachment";
import { Announcement } from "../domain/Announcement";
import { AnnouncementId } from "../domain/AnnouncementId";
import { AnnouncementRepository } from "../domain/AnnouncementRepository";

interface DatabaseAnnouncement {
	id: string;
	title: string;
	content: string;
	authorId: string;
	publishDate: string;
	attachments: AttachmentPrimitives[];
}
export class PostgresAnnouncementRepository implements AnnouncementRepository {
	constructor(private readonly connection: PostgresConnection) {}

	async search(id: AnnouncementId): Promise<Announcement | null> {
		const res = await this.connection.searchOne<DatabaseAnnouncement>(
			"SELECT *** insert PARAMETROS *** FROM cda__announcements WHERE id = $1 LIMIT 1",
			[id.value]
		);

		if (!res) {
			return null;
		}

		return Announcement.fromPrimitives(res);
	}

	async matching(criteria: Criteria): Promise<Announcement[]> {
		const converter = new CriteriaToSqlConverter();

		const results = await this.connection.searchAll<DatabaseAnnouncement>(
			converter.convert(
				["id", "title", "content", "authorId", "publishDate"],
				"cda__announcements",
				criteria
			)
		);

		return results.map(a =>
			Announcement.fromPrimitives({
				id: a.id,
				title: a.title,
				content: a.content,
				authorId: a.authorId,
				publishDate: a.publishDate,
				attachments: a.attachments
			})
		);
	}
}
