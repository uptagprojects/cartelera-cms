import { Criteria } from "../../../shared/domain/criteria/Criteria";
import { CriteriaToPostgresSqlConverter } from "../../../shared/infrastructure/criteria/CriteriaToPostgresSqlConverter";
import { PostgresConnection } from "../../../shared/infrastructure/PostgresConnection";
import { AttachmentPrimitives } from "../../attachments/domain/Attachment";
import { Guide } from "../domain/Guide";
import { GuideId } from "../domain/GuideId";
import { GuideRepository } from "../domain/GuideRepository";
import { ProfessorPrimitives } from "../domain/Professor/Professor";

interface DatabaseGuide {
	id: string;
	title: string;
	content: string;
	area: string;
	professor: ProfessorPrimitives;
	publishDate: string;
	attachments: AttachmentPrimitives[];
}

export class PostgresGuideRepository implements GuideRepository {
	constructor(private readonly connection: PostgresConnection) {}

	async search(id: GuideId): Promise<Guide | null> {
		const res = await this.connection.searchOne<DatabaseGuide>(
			"SELECT id, title, content, professor_id AS, publishDate FROM cda__guides WHERE id = $1 LIMIT 1",
			[id.value]
		);

		if (!res) {
			return null;
		}

		return Guide.fromPrimitives(res);
	}

	async matching(criteria: Criteria): Promise<Guide[]> {
		const converter = new CriteriaToPostgresSqlConverter();
		const { query, params } = converter.convert(
			["id", "title", "content", "professorId", "publishDate"],
			"cda__guides",
			criteria
		);

		const results = await this.connection.searchAll<DatabaseGuide>(query, params);

		return results.map(a =>
			Guide.fromPrimitives({
				id: a.id,
				title: a.title,
				content: a.content,
				area: a.area,
				professor: a.professor,
				publishDate: a.publishDate,
				attachments: a.attachments
			})
		);
	}
}
