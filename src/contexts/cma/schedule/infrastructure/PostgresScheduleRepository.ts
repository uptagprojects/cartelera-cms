import { Criteria } from "../../../shared/domain/criteria/Criteria";
import { PostgresConnection } from "../../../shared/infrastructure/PostgresConnection";
import { CriteriaToPostgresSqlConverter } from "../../../shared/infrastructure/criteria/CriteriaToPostgresSqlConverter";
import { Schedule } from "../domain/Schedule";
import { ScheduleId } from "../domain/ScheduleId";
import { ScheduleRepository } from "../domain/ScheduleRepository";
import { ScheduleRemovedDomainEvent } from "../domain/event/ScheduleRemovedDomainEvent";
interface DatabaseSchedule {
	id: string;
    name: string;
    start_date: string;
    finish_date: string;
    status: string;
}
export class PostgresScheduleRepository implements ScheduleRepository {
    constructor(private readonly connection: PostgresConnection) {}
    async save(schedule: Schedule): Promise<void> {
        const primitives = schedule.toPrimitives();
        const query = "INSERT INTO cma__schedules (id, name, start_date, finish_date, status) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (id) DO UPDATE SET name = $2, start_date = $3, finish_date = $4, status = $5";
        const values = [
            primitives.id,
            primitives.name,
            primitives.startDate,
            primitives.finishDate,
            primitives.status
        ];
        await this.connection.execute(query, values);
    }
    async search(id: ScheduleId): Promise<Schedule | null> {
        const res = await this.connection.searchOne<DatabaseSchedule>("SELECT id, name, start_date, finish_date, status FROM cma__schedules WHERE id = $1 LIMIT 1", [id.value]);
        
        if(!res) {
            return null;
        }
        return Schedule.fromPrimitives({
            id: res.id,
            name: res.name,
            startDate: res.start_date,
            finishDate: res.finish_date,
            status: res.status
        });
    }
    
    async matching(criteria: Criteria): Promise<Schedule[]> {
        const converter = new CriteriaToPostgresSqlConverter();
		const { query, params } = converter.convert(
			["id", "name", "start_date", "finish_date", "status"],
			"cma__schedules",
			criteria
		);
		const results = await this.connection.searchAll<DatabaseSchedule>(query, params);
		return results.map(row =>
			Schedule.fromPrimitives({
				id: row.id,
                name: row.name,
                startDate: row.start_date,
                finishDate: row.finish_date,
                status: row.status
			})
		);
    }

    async remove(guide: Schedule): Promise<void> {
		const { id } = guide.toPrimitives();

		guide.record(new ScheduleRemovedDomainEvent(id));

		await this.connection.execute("DELETE FROM cma__schedules WHERE id = $1", [id]);
	}
}