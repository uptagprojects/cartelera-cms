import { Criteria } from "../../../shared/domain/criteria/Criteria";
import { CriteriaToPostgresSqlConverter } from "../../../shared/infrastructure/criteria/CriteriaToPostgresSqlConverter";
import { PostgresConnection } from "../../../shared/infrastructure/PostgresConnection";
import { Event } from "../domain/Event";
import { EventId } from "../domain/EventId";
import { EventRepository } from "../domain/EventRepository";

interface DatabaseEvent {
	id: string;
	name: string;
	location: string;
	start_date: string;
	end_date: string;
}
export class PostgresEventRepository implements EventRepository {
	constructor(private readonly connection: PostgresConnection) {}

	async save(event: Event): Promise<void> {
		const primitives = event.toPrimitives();

		await this.connection.execute(
			"INSERT INTO cda__events (id, name, location, start_date, end_date) VALUES ($1, $2, $3, $4, $5)",
			[primitives.id, primitives.name, primitives.location, primitives.startDate, primitives.endDate]
		);
	}

	async search(id: EventId): Promise<Event | null> {
		const res = await this.connection.searchOne<DatabaseEvent>(
			"SELECT id, name, location, start_date, end_date FROM cda__events WHERE id = $1 LIMIT 1",
			[id.value]
		);

		if (!res) {
			return null;
		}

		return Event.fromPrimitives({
			id: res.id,
			name: res.name,
			location: res.location,
			startDate: res.start_date,
			endDate: res.end_date
		});
	}

	async matching(criteria: Criteria): Promise<Event[]> {
		const converter = new CriteriaToPostgresSqlConverter();
		const { query, params } = converter.convert(
			["id", "name", "location", "start_date", "end_date"],
			"cda__events",
			criteria
		);

		const results = await this.connection.searchAll<DatabaseEvent>(query, params);

		return results.map(a =>
			Event.fromPrimitives({
				id: a.id,
				name: a.name,
				location: a.location,
				startDate: a.start_date,
				endDate: a.end_date
			})
		);
	}

	async remove(event: Event): Promise<void> {
		const { id } = event.toPrimitives();
		await this.connection.execute("DELETE FROM cda__events WHERE id = $1", [id]);
	}
}
