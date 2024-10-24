import { Pool } from "pg";
import { EventRepository } from "../domain/EventRepository";
import { Event } from "../domain/Event";
import { EventId } from "../domain/EventId";

interface DatabaseEvent {
    id: string,
    name: string,
    location: string,
    startDate: Date,
    endDate: Date
}

export class PostgresEventRepository implements EventRepository {
    constructor(private readonly pool: Pool) { }

    async search(id: EventId) {

        const client = await this.pool.connect();

        const res = await client.query<DatabaseEvent>(
            "SELECT *** insert PARAMETROS *** FROM cda__events WHERE id = $1 LIMIT 1",
            [id.value]
        );
        client.release();

        if (res.rows.length < 1 || !res.rows[0]) {
            return null;
        }

        return Event.fromPrimitives(res.rows[0]);


    }
}