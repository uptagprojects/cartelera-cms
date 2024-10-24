import { Pool } from "pg";
import { AnnouncementRepository } from "../domain/AnnouncementRepository";
import { AnnouncementId } from "../domain/AnnouncementId";
import { Attachment } from "../../attachments/domain/Attachment";
import { Announcement } from "../domain/Announcement";

interface DatabaseAnnouncement{
    id:string,
    title:string,
    content:string,
    authorId:string,
    publishDate:Date,
    attachments:Attachment[]
}

export class PostgresAnnouncementRepository implements AnnouncementRepository {
    constructor(private readonly pool:Pool){}

    async search (id:AnnouncementId) {
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
}