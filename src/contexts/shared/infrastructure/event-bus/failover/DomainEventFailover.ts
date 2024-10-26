import { Service } from "diod";
import { PostgresConnection } from "../../PostgresConnection";

type DatabaseEvent = {
    eventId: string;
    eventName: string;
    body: string;
}

@Service()
export class DomainEventFailover {
    constructor(private readonly connection: PostgresConnection) {}

    async publish(eventId: string, eventName: string, serializedEvent: string): Promise<void> {
        await this.connection.execute("INSERT INTO shared__failover_domain_events (event_id, event_name, body) VALUES ($1, $2, $3)", [
            eventId,
            eventName,
            serializedEvent
        ]);
    }

    async consume(total: number): Promise<DatabaseEvent[]> {
        const result = await this.connection.searchAll<DatabaseEvent>("SELECT event_id, event_name, body FROM shared__failover_domain_events LIMIT $1", [total]);
        await this.connection.execute("DELETE FROM shared__failover_domain_events LIMIT $1", [total]);

        return result;
    }
}