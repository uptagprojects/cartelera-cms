import { Criteria } from "../../../shared/domain/criteria/Criteria";
import { CriteriaToPostgresSqlConverter } from "../../../shared/infrastructure/criteria/CriteriaToPostgresSqlConverter";
import { PostgresConnection } from "../../../shared/infrastructure/PostgresConnection";
import { GuideRemovedDomainEvent } from "../domain/events/GuideRemovedDomainEvent";
import { Guide } from "../domain/Guide";
import { GuideId } from "../domain/GuideId";
import { GuideRepository } from "../domain/GuideRepository";

interface DatabaseGuide {
    id: string;
    title: string;
    content: string;
    area_id: string;
    author_id: string;
    status: string;
}

export class PostgresGuideRepository implements GuideRepository {
    constructor(private readonly connection: PostgresConnection) {}

    async save(guide: Guide): Promise<void> {
        const guidePrimitives = guide.toPrimitives();

        const params = [
            guidePrimitives.id,
            guidePrimitives.title,
            guidePrimitives.content,
            guidePrimitives.ucId,
            guidePrimitives.authorId,
            guidePrimitives.status
        ];

        await this.connection.execute(
            `INSERT INTO cma__guides (id, title, content, area_id, author_id, status) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT (id) DO UPDATE SET title = $2, content = $3, area_id = $4, status = $6`,
            params
        );
    }

    async search(id: GuideId): Promise<Guide | null> {
        const res = await this.connection.searchOne<DatabaseGuide>(
            "SELECT id, title, content, area_id, author_id, status FROM cma__guides WHERE id = $1 LIMIT 1",
            [id.value]
        );

        if (!res) {
            return null;
        }

        return Guide.fromPrimitives({
            id: res.id,
            title: res.title,
            content: res.content,
            ucId: res.area_id,
            authorId: res.author_id,
            status: res.status
        });
    }

    async searchAll(): Promise<Guide[]> {
        const res = await this.connection.searchAll<DatabaseGuide>(
            "SELECT id, title, content, area_id, author_id, status FROM cma__guides",
            []
        );

        return res.map(row =>
            Guide.fromPrimitives({
                id: row.id,
                title: row.title,
                content: row.content,
                ucId: row.area_id,
                authorId: row.author_id,
                status: row.status
            })
        );
    }

    async matching(criteria: Criteria): Promise<Guide[]> {
        const converter = new CriteriaToPostgresSqlConverter();
        const { query, params } = converter.convert(
            ["id", "title", "content", "area_id", "author_id", "status"],
            "cma__guides",
            criteria
        );

        const results = await this.connection.searchAll<DatabaseGuide>(query, params);

        return results.map(row =>
            Guide.fromPrimitives({
                id: row.id,
                title: row.title,
                content: row.content,
                ucId: row.area_id,
                authorId: row.author_id,
                status: row.status
            })
        );
    }

    async remove(guide: Guide): Promise<void> {
        const { id, ucId } = guide.toPrimitives();

        guide.record(new GuideRemovedDomainEvent(id, ucId));

        await this.connection.execute("DELETE FROM cma__guides WHERE id = $1", [id]);
    }
}
