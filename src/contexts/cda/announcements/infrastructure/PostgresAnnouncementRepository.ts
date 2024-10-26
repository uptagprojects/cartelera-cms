import { Pool } from "pg";
import { AnnouncementRepository } from "../domain/AnnouncementRepository";
import { AnnouncementId } from "../domain/AnnouncementId";
import { AttachmentPrimitives } from "../../attachments/domain/Attachment";
import { Announcement } from "../domain/Announcement";
import { Criteria } from "@/contexts/shared/domain/criteria/Criteria";
import { CriteriaToSqlConverter } from "@/contexts/shared/infrastructure/criteria/CriteriaToSqlConverter";

interface DatabaseAnnouncement {
    id: string,
    title: string,
    content: string,
    authorId: string,
    publishDate: string,
    attachments: AttachmentPrimitives[]
}

export class PostgresAnnouncementRepository implements AnnouncementRepository {
    constructor(private readonly pool: Pool) { }

    async search(id: AnnouncementId) {
        const client = await this.pool.connect();

        const res = await client.query<DatabaseAnnouncement>(
            "SELECT *** insert PARAMETROS *** FROM cda__announcements WHERE id = $1 LIMIT 1",
            [id.value]
        );
        client.release();

        if (res.rows.length < 1 || !res.rows[0]) {
            return null;
        }

        return Announcement.fromPrimitives(res.rows[0]);
    }


    async matching(criteria: Criteria): Promise<Announcement[]> {
		const converter = new CriteriaToSqlConverter();

		const result = await this.pool.query<DatabaseAnnouncement>(
			converter.convert(["id", "title", "content", "authorId", "publishDate"], "cda__announcements", criteria),
		);

		return result.rows.map((a) =>
			Announcement.fromPrimitives({
				id: a.id,
				title: a.title,
				content: a.content,
				authorId: a.authorId,
                publishDate: a.publishDate,
                attachments: a.attachments
			}),
		);
	}
}