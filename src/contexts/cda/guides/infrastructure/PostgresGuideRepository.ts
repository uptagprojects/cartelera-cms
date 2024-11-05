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
	content_wrapped: string;
	area: string;
	professor: string;
	stored_creation_timestamp: string;
	attachments: string;
}

export class PostgresGuideRepository implements GuideRepository {
	constructor(private readonly connection: PostgresConnection) {}

	async save(guide: Guide): Promise<void> {
		const primitives = guide.toPrimitives();

		await this.connection.execute(
			"INSERT INTO cda__guides (id, title, content, content_wrapped, area, professor, published_date, attachments) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) ON CONFLICT (id) DO UPDATE SET title=$2, content=$3, content_wrapped=$4, area=$5, professor=$6, published_date=$7, attachments=$8",
			[
				primitives.id,
				primitives.title,
				primitives.content,
				primitives.contentWrapped,
				primitives.area,
				JSON.stringify(primitives.professor),
				primitives.publishDate,
				JSON.stringify(primitives.attachments)
			]
		);
	}

	async search(id: GuideId): Promise<Guide | null> {
		const res = await this.connection.searchOne<DatabaseGuide>(
			"SELECT id, title, content, content_wrapped, area, professor, stored_creation_timestamp, attachments FROM cda__guides WHERE id = $1 LIMIT 1",
			[id.value]
		);

		if (!res) {
			return null;
		}

		return Guide.fromPrimitives({
			id: res.id,
			title: res.title,
			content: res.content,
			contentWrapped: res.content_wrapped,
			area: res.area,
			professor: JSON.parse(res.professor),
			publishDate: res.stored_creation_timestamp,
			attachments: JSON.parse(res.attachments)
		});
	}

	async matching(criteria: Criteria): Promise<Guide[]> {
		const converter = new CriteriaToPostgresSqlConverter();
		const { query, params } = converter.convert(
			[
				"id",
				"title",
				"content",
				"content_wrapped",
				"professor",
				"area",
				"stored_creation_timestamp"
			],
			"cda__guides",
			criteria
		);

		const results = await this.connection.searchAll<DatabaseGuide>(query, params);

		return results.map(a =>
			Guide.fromPrimitives({
				id: a.id,
				title: a.title,
				content: a.content,
				contentWrapped: a.content_wrapped,
				area: a.area,
				professor: JSON.parse(a.professor),
				publishDate: a.stored_creation_timestamp,
				attachments: JSON.parse(a.attachments)
			})
		);
	}
}
