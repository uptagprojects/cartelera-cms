import { Criteria } from "../../../shared/domain/criteria/Criteria";
import { CriteriaToPostgresSqlConverter } from "../../../shared/infrastructure/criteria/CriteriaToPostgresSqlConverter";
import { PostgresConnection } from "../../../shared/infrastructure/PostgresConnection";
import { UC } from "../domain/UC";
import { UCId } from "../domain/UCId";
import { UCRepository } from "../domain/UCRepository";

interface DatabaseUC {
	id: string;
	name: string;
}

export class PostgresUCRepository implements UCRepository {
	constructor(private readonly connection: PostgresConnection) {}

	async search(id: UCId): Promise<UC | null> {
		const res = await this.connection.searchOne<DatabaseUC>(
			"SELECT *** insert PARAMETROS *** FROM cda__ucs WHERE id = $1 LIMIT 1",
			[id.value]
		);

		if (!res) {
			return null;
		}

		return UC.fromPrimitives(res);
	}

	async matching(criteria: Criteria): Promise<UC[]> {
		const converter = new CriteriaToPostgresSqlConverter();
		const { query, params } = converter.convert(
			["id", "title", "content", "professorId", "publishDate"],
			"cda__guides",
			criteria
		);

		const results = await this.connection.searchAll<DatabaseUC>(query, params);

		return results.map(a =>
			UC.fromPrimitives({
				id: a.id,
				name: a.name
			})
		);
	}
}
