import { Criteria } from "../../../shared/domain/criteria/Criteria";
import { CriteriaToPostgresSqlConverter } from "../../../shared/infrastructure/criteria/CriteriaToPostgresSqlConverter";
import { PostgresConnection } from "../../../shared/infrastructure/PostgresConnection";
import { Event } from "../domain/Event";
import { EventRemovedDomainEvent } from "../domain/events/EventRemovedDomainEvent";
import { EventId } from "../domain/EventId";
import { EventRepository } from "../domain/EventRepository";

export type DatabaseEvent = {
    id: string;
    name: string;
    location: string;
    startDate: string;
    endDate: string;
};

export class PostgresEventRepository implements EventRepository {
    constructor(private readonly connection: PostgresConnection) {}

    async save(event: Event): Promise<void> {
        const eventPrimitives = event.toPrimitives();

        const params = [
            eventPrimitives.id,
            eventPrimitives.name,
            eventPrimitives.location,
            eventPrimitives.startDate,
            eventPrimitives.endDate
        ];

        await this.connection.execute(
            `INSERT INTO cma__events (id, name, location, start_date, end_date) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (id) DO UPDATE SET name = $2`,
            params
        );
    }

    async search(id: EventId): Promise<Event | null> {
        const res = await this.connection.searchOne<DatabaseEvent>(
            "SELECT id, name, location, start_date, end_date FROM cma__events WHERE id = $1 LIMIT 1",
            [id.value]
        );

        if (!res) {
            return null;
        }

        return Event.fromPrimitives(res);
    }

    async searchAll(): Promise<Event[]> {
        const res = await this.connection.searchAll<DatabaseEvent>(
            "SELECT id, name, location, start_date, end_date FROM cma__events",
            []
        );

        return res.map(r => Event.fromPrimitives(r));
    }

    async matching(criteria: Criteria): Promise<Event[]> {
        const converter = new CriteriaToPostgresSqlConverter();
        const { query, params } = converter.convert(
            ["id", "name", "location", "start_date", "end_date"],
            "cma__events",
            criteria
        );

        const results = await this.connection.searchAll<DatabaseEvent>(query, params);

        return results.map(a =>
            Event.fromPrimitives({
                id: a.id,
                name: a.name,
                location: a.location,
                startDate: a.startDate,
                endDate: a.endDate
            })
        );
    }

    async remove(event: Event): Promise<void> {
        const { id } = event.toPrimitives();

        event.record(new EventRemovedDomainEvent(id));

        await this.connection.execute("DELETE FROM cma__events WHERE id = $1", [id]);
    }
}
