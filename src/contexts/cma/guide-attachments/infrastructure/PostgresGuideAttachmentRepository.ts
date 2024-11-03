import { PostgresConnection } from "../../../shared/infrastructure/PostgresConnection";
import { GuideId } from "../../guides/domain/GuideId";
import { GuideAttachment } from "../domain/GuideAttachment";
import { GuideAttachmentId } from "../domain/GuideAttachmentId";
import { GuideAttachmentRepository } from "../domain/GuideAttachmentRepository";

export type DatabaseGuideAttachment = {
	id: string;
	guide_id: string;
	url: string;
};

export class PostgresGuideAttachmentRepository implements GuideAttachmentRepository {
	constructor(private readonly connection: PostgresConnection) {}

	async save(guideAttachment: GuideAttachment): Promise<void> {
		const attachmentPrimitives = guideAttachment.toPrimitives();

		const params = [
			attachmentPrimitives.id,
			attachmentPrimitives.guideId,
			attachmentPrimitives.url
		];

		await this.connection.execute(
			`INSERT INTO cma__guide_attachments (id, guide_id, url) VALUES ($1, $2, $3) ON CONFLICT (id) DO UPDATE SET url = $4`,
			params
		);
	}

	async search(id: GuideAttachmentId): Promise<GuideAttachment | null> {
		const res = await this.connection.searchOne<DatabaseGuideAttachment>(
			"SELECT id, guide_id, url FROM cma__announcements WHERE id = $1 LIMIT 1",
			[id.value]
		);

		if (!res) {
			return null;
		}

		return GuideAttachment.fromPrimitives({
			id: res.id,
			guideId: res.guide_id,
			url: res.url
		});
	}

	async searchAllByGuideId(guideId: GuideId): Promise<GuideAttachment[]> {
		const res = await this.connection.searchAll<DatabaseGuideAttachment>(
			"SELECT id, guide_id, url FROM cma__announcements WHERE guide_id = $1",
			[guideId.value]
		);

		return res.map(r =>
			GuideAttachment.fromPrimitives({
				id: r.id,
				guideId: r.guide_id,
				url: r.url
			})
		);
	}

	async remove(attachment: GuideAttachment): Promise<void> {
		const { id } = attachment.toPrimitives();
		await this.connection.execute("DELETE FROM cma__guide_attachments WHERE id = $1", [id]);
	}
}
