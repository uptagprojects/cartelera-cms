import { Criteria } from "../../../shared/domain/criteria/Criteria";
import { CriteriaToPostgresSqlConverter } from "../../../shared/infrastructure/criteria/CriteriaToPostgresSqlConverter";
import { PostgresConnection } from "../../../shared/infrastructure/PostgresConnection";
import { Schedule } from "../domain/Schedule";
import { ScheduleId } from "../domain/ScheduleId";
import { ScheduleRepository } from "../domain/ScheduleRepository";

export type DatabaseSchedule = {
	id: string;
	startDate: string;
	endDate: string;
};

export class PostgresScheduleRepository implements ScheduleRepository {
	constructor(private readonly connection: PostgresConnection) {}

	async search(id: ScheduleId): Promise<Schedule | null> {
		const res = await this.connection.searchOne<DatabaseSchedule>(
			"SELECT id, start_date, end_date FROM cda__schedules WHERE id = $1 LIMIT 1",
			[id.value]
		);

		if (!res) {
			return null;
		}

		return Schedule.fromPrimitives(res);
	}

	async searchAll(): Promise<Schedule[]> {
		const res = await this.connection.searchAll<DatabaseSchedule>(
			"SELECT id, start_date, end_date FROM cda__schedules",
			[]
		);

		return res.map(r => Schedule.fromPrimitives(r));
	}

	async matching(criteria: Criteria): Promise<Schedule[]> {
		const converter = new CriteriaToPostgresSqlConverter();
		const { query, params } = converter.convert(
			["id", "start_date", "end_date"],
			"cda__schedules",
			criteria
		);

		const results = await this.connection.searchAll<DatabaseSchedule>(query, params);

		return results.map(a =>
			Schedule.fromPrimitives({
				id: a.id,
				startDate: a.startDate,
				endDate: a.endDate
			})
		);
	}
}
