import { Criteria } from "../../../shared/domain/criteria/Criteria";
import { CriteriaToPostgresSqlConverter } from "../../../shared/infrastructure/criteria/CriteriaToPostgresSqlConverter";
import { PostgresConnection } from "../../../shared/infrastructure/PostgresConnection";
import { Guide } from "../domain/Guide";
import { GuideId } from "../domain/GuideId";
import { GuideRepository } from "../domain/GuideRepository";

interface DatabaseGuide {
	id: string;
	title: string;
	content: string;
	areaId: string;
	authorId: string;
	status: string;
}

export class PostgresGuideRepository implements GuideRepository {
	constructor(private readonly connection: PostgresConnection) { }

	async save(guide: Guide): Promise<void> {
		const guidePrimitives = guide.toPrimitives();

		const params = [guidePrimitives.id, guidePrimitives.title, guidePrimitives.content, guidePrimitives.areaId.toString(), guidePrimitives.authorId, guidePrimitives.status];

		await this.connection.execute(
			`INSERT INTO cma__guides (id, title, content, areaId, authorId, status) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT (id) DO UPDATE SET title = $2`,
			params
		);
	}

	async search(id: GuideId): Promise<Guide | null> {
		const res = await this.connection.searchOne<DatabaseGuide>(
			"SELECT id, title, content, areaId, authorId, status FROM cma__guides WHERE id = $1 LIMIT 1",
			[id.value]
		);

		if (!res) {
			return null;
		}

		return Guide.fromPrimitives({
			id: res.id,
			title: res.title,
			content: res.content,
			areaId: res.areaId,
			authorId: res.authorId,
			status: res.status
		});
	}

	async searchAll(): Promise<Guide[]> {
		const res = await this.connection.searchAll<DatabaseGuide>(
			"SELECT id, title, content, areaId, authorId, status FROM cma__guides",
			[]
		);

		return res.map(r => Guide.fromPrimitives(r));
	}

	async matching(criteria: Criteria): Promise<Guide[]> {
		const converter = new CriteriaToPostgresSqlConverter();
		const { query, params } = converter.convert(
			["id", "title", "content", "areaId", "authorId", "status"],
			"cma__guides",
			criteria
		);

		const results = await this.connection.searchAll<DatabaseGuide>(query, params);

		return results.map(a =>
			Guide.fromPrimitives({
				id: a.id,
				title: a.title,
				content: a.content,
				areaId: a.areaId,
				authorId: a.authorId,
				status: a.status
			})
		);
	}

	async remove(guide: Guide): Promise<void> {
		const { id } = guide.toPrimitives();

		await this.connection.execute(
			"DELETE FROM cma__guides WHERE id = $1",
			[id]
		);
	}

}
