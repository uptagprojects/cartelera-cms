import { Pool } from 'pg';
import { Attachment } from '../../attachments/domain/Attachment';
import { GuideRepository } from '../domain/GuideRepository';
import { Guide } from '../domain/Guide';
import { GuideId } from '../domain/GuideId';

interface DatabaseGuide {
    id:string,
    title: string,
    content: string,
    professorId: string,
    publishDate : Date,
    attachments : Attachment[]
}

export class PostgresGuideRepository implements GuideRepository {
    constructor (private readonly pool:Pool) {}
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