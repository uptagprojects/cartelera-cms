import { Criteria } from "../../../shared/domain/criteria/Criteria";
import { CriteriaToPostgresSqlConverter } from "../../../shared/infrastructure/criteria/CriteriaToPostgresSqlConverter";
import { PostgresConnection } from "../../../shared/infrastructure/PostgresConnection";
import { Schedule } from "../domain/Schedule";
import { ScheduleId } from "../domain/ScheduleId";
import { ScheduleRepository } from "../domain/ScheduleRepository";

export type DatabaseSchedule = {
    id: string;
    name: string;
    start_date: string;
    finish_date: string;
    attachments: string;
}

export class PostgresScheduleRepository implements ScheduleRepository {
    constructor(private readonly connection: PostgresConnection) { }

    async save(schedule: Schedule): Promise<void> {
        const primitives = schedule.toPrimitives();

        await this.connection.execute(
            "INSERT INTO cda__schedule (id, name, start_date, finish_date, attachments) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (id) DO UPDATE SET name=$2, start_date=$3, finish_date=$4, attachments=$5",
            [
                primitives.id,
                primitives.name,
                primitives.startDate,
                primitives.finishDate,
                JSON.stringify(primitives.attachments)
            ]
        );
    }

    async search(id: ScheduleId): Promise<Schedule | null> {
        const res = await this.connection.searchOne<DatabaseSchedule>(
            "SELECT id, name, start_date, finish_date, attachments FROM cda__schedules WHERE id = $1 LIMIT 1",
            [id.value]
        );

        if (!res) {
            return null;
        }

        return Schedule.fromPrimitives({
            id: res.id,
            name: res.name,
            startDate: res.start_date,
            finishDate: res.finish_date,
            attachments: JSON.parse(res.attachments)
        });
    }

    async matching(criteria: Criteria): Promise<Schedule[]> {
        const converter = new CriteriaToPostgresSqlConverter();
        const { query, params } = converter.convert(
            ["id", "name", "start_date", "finish_date"],
            "cda__schedules",
            criteria
        );

        const results = await this.connection.searchAll<DatabaseSchedule>(query, params);

        return results.map(a =>
            Schedule.fromPrimitives({
                id: a.id,
                name: a.name,
                startDate: a.start_date,
                finishDate: a.finish_date,
                attachments: JSON.parse(a.attachments)
            })
        );
    }

    async remove(schedule: Schedule): Promise<void> {
        const { id } = schedule.toPrimitives();

        await this.connection.execute(
            "DELETE FROM cda__schedules WHERE id = $1",
            [id]
        );
    }

}
