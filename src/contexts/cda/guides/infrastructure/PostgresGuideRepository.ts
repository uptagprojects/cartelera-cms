import { PostgresConnection } from "../../../shared/infrastructure/PostgresConnection";
import { AttachmentPrimitives } from "../../attachments/domain/Attachment";
import { Guide } from "../domain/Guide";
import { GuideId } from "../domain/GuideId";
import { GuideRepository } from "../domain/GuideRepository";

interface DatabaseGuide {
	id: string;
	title: string;
	content: string;
	professorId: string;
	publishDate: string;
	attachments: AttachmentPrimitives[];
}

export class PostgresGuideRepository implements GuideRepository {
	constructor(private readonly connection: PostgresConnection) {}

	async search(id: GuideId): Promise<Guide | null> {
		const res = await this.connection.searchOne<DatabaseGuide>(
			"SELECT *** insert PARAMETROS *** FROM cda__guides WHERE id = $1 LIMIT 1",
			[id.value]
		);

		if (!res) {
			return null;
		}

		return Guide.fromPrimitives(res);
	}
}
