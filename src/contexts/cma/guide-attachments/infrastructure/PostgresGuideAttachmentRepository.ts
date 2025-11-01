import { Service } from "diod";

import { PostgresConnection } from "../../../shared/infrastructure/PostgresConnection";
import { GuideId } from "../../guides/domain/GuideId";
import { GuideAttachment } from "../domain/GuideAttachment";
import { GuideAttachmentId } from "../domain/GuideAttachmentId";
import { GuideAttachmentRepository } from "../domain/GuideAttachmentRepository";

type DatabaseGuideAttachment = {
    id: string;
    name: string;
    guide_id: string;
    url: string;
    size: number;
    mime_type: string;
    storage_path: string;
};

@Service()
export class PostgresGuideAttachmentRepository implements GuideAttachmentRepository {
    constructor(private readonly connection: PostgresConnection) {}

    async save(guideAttachment: GuideAttachment): Promise<void> {
        const primitives = guideAttachment.toPrimitives();
        await this.connection.execute(
            "INSERT INTO cma__guide_attachments (id, name, guide_id, url, size, mime_type, storage_path) VALUES ($1, $2, $3, $4, $5, $6, $7) ON CONFLICT (id) DO UPDATE SET name=$2",
            [
                primitives.id,
                primitives.name,
                primitives.guideId,
                primitives.url,
                primitives.size,
                primitives.mimeType,
                primitives.storagePath
            ]
        );
    }

    async search(id: GuideAttachmentId): Promise<GuideAttachment | null> {
        const result = await this.connection.searchOne<DatabaseGuideAttachment>(
            "SELECT id, name, guide_id, url, size, mime_type, storage_path FROM cma__guide_attachments WHERE id = $1",
            [id.value]
        );

        if (!result) {
            return null;
        }

        return GuideAttachment.fromPrimitives({
            id: result.id,
            name: result.name,
            guideId: result.guide_id,
            url: result.url,
            size: result.size,
            mimeType: result.mime_type,
            storagePath: result.storage_path
        });
    }

    async searchAllByGuideId(guideId: GuideId): Promise<GuideAttachment[]> {
        const res = await this.connection.searchAll<DatabaseGuideAttachment>(
            "SELECT id, name, guide_id, url, size, mime_type, storage_path FROM cma__guide_attachments WHERE guide_id = $1",
            [guideId.value]
        );

        return res.map(result =>
            GuideAttachment.fromPrimitives({
                id: result.id,
                name: result.name,
                guideId: result.guide_id,
                url: result.url,
                size: result.size,
                mimeType: result.mime_type,
                storagePath: result.storage_path
            })
        );
    }

    async remove(guideAttachment: GuideAttachment): Promise<void> {
        const { id } = guideAttachment.toPrimitives();

        await this.connection.execute("DELETE FROM cma__guide_attachments WHERE id = $1", [id]);
    }
}
