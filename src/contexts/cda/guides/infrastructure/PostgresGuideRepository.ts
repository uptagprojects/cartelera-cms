import { Pool } from 'pg';
<<<<<<< HEAD
import { Attachment } from '../../attachments/domain/Attachment';
=======
import { AttachmentPrimitives } from '../../attachments/domain/Attachment';
>>>>>>> feature/cda-domain
import { GuideRepository } from '../domain/GuideRepository';
import { Guide } from '../domain/Guide';
import { GuideId } from '../domain/GuideId';

interface DatabaseGuide {
<<<<<<< HEAD
    id:string,
    title: string,
    content: string,
    professorId: string,
    publishDate : Date,
    attachments : Attachment[]
}

export class PostgresGuideRepository implements GuideRepository {
    constructor (private readonly pool:Pool) {}
=======
    id: string,
    title: string,
    content: string,
    professorId: string,
    publishDate: string,
    attachments: AttachmentPrimitives[]
}

export class PostgresGuideRepository implements GuideRepository {
    constructor(private readonly pool: Pool) { }
>>>>>>> feature/cda-domain
    async search(id: GuideId) {

        const client = await this.pool.connect();

        const res = await client.query<DatabaseGuide>(
            "SELECT *** insert PARAMETROS *** FROM cda__guides WHERE id = $1 LIMIT 1",
            [id.value]
        );
        client.release();

        if (res.rows.length < 1 || !res.rows[0]) {
            return null;
        }

        return Guide.fromPrimitives(res.rows[0]);
    }
}