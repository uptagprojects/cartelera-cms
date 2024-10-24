import { Pool } from "pg";
import { UCRepository } from "../domain/UCRepository";
import { UCId } from "../domain/UCId";
import { UC } from "../domain/UC";

interface DatabaseUC {
    id: string,
    name: string
}

export class PostgresUCRepository implements UCRepository {
    constructor (private readonly pool:Pool) {}

    async search (id : UCId) {
        const client = await this.pool.connect();

        const res = await client.query<DatabaseUC>(
            "SELECT *** insert PARAMETROS *** FROM cda__ucs WHERE id = $1 LIMIT 1",
            [id.value]
        );
        client.release();

        if (res.rows.length < 1 || !res.rows[0]) {
            return null;
        }

        return UC.fromPrimitives(res.rows[0]);
    }


}