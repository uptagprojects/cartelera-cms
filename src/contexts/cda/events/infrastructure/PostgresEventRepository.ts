import { PostgresConnection } from "../../../shared/infrastructure/PostgresConnection";
import { Event } from "../domain/Event";
import { EventId } from "../domain/EventId";
import { EventRepository } from "../domain/EventRepository";

interface DatabaseEvent {
	id: string;
	name: string;
	location: string;
	startDate: string;
	endDate: string;
}

export class PostgresEventRepository implements EventRepository {
	constructor(private readonly connection: PostgresConnection) {}

	async search(id: EventId): Promise<Event | null> {
		const res = await this.connection.searchOne<DatabaseEvent>(
			"SELECT *** insert PARAMETROS *** FROM cda__events WHERE id = $1 LIMIT 1",
			[id.value]
		);

		if (!res) {
			return null;
		}

		return Event.fromPrimitives(res);
	}
}
