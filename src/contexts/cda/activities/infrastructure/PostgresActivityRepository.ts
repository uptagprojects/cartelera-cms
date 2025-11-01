import { Service } from "diod";

import { Criteria } from "../../../shared/domain/criteria/Criteria";
import { CriteriaToPostgresSqlConverter } from "../../../shared/infrastructure/criteria/CriteriaToPostgresSqlConverter";
import { PostgresConnection } from "../../../shared/infrastructure/PostgresConnection";
import { Activity } from "../domain/Activity";
import { ActivityId } from "../domain/ActivityId";
import { ActivityRepository } from "../domain/ActivityRepository";

type DatabaseActivity = {
    id: string;
    type: string;
    title: string;
    context: string;
    published_date: Date;
};

@Service()
export class PostgresActivityRepository implements ActivityRepository {
    constructor(private readonly connection: PostgresConnection) {}

    async matching(criteria: Criteria): Promise<Activity[]> {
        const converter = new CriteriaToPostgresSqlConverter();
        const { query, params } = converter.convert(
            ["id", "type", "title", "context", "published_date"],
            "cda__activities",
            criteria
        );

        const results = await this.connection.searchAll<DatabaseActivity>(query, params);

        return results.map(a =>
            Activity.fromPrimitives({
                id: a.id,
                type: a.type,
                title: a.title,
                context: a.context,
                publishedDate: a.published_date.toISOString()
            })
        );
    }

    async search(id: ActivityId): Promise<Activity | null> {
        const res = await this.connection.searchOne<DatabaseActivity>(
            "SELECT id, type, title, context, published_date FROM cda__activities WHERE id = $1 LIMIT 1",
            [id.value]
        );

        if (!res) {
            return null;
        }

        return Activity.fromPrimitives({
            id: res.id,
            type: res.type,
            title: res.title,
            context: res.context,
            publishedDate: res.published_date.toISOString()
        });
    }

    async save(activity: Activity): Promise<void> {
        const primitives = activity.toPrimitives();

        await this.connection.execute(
            "INSERT INTO cda__activities (id, type, title, context, published_date) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (id) DO UPDATE SET title=$3, context=$4",
            [primitives.id, primitives.type, primitives.title, primitives.context, primitives.publishedDate]
        );
    }
}
