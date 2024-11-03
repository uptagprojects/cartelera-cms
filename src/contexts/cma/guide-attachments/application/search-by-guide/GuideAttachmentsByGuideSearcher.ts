import { GuideId } from "../../../guides/domain/GuideId";
import { GuideAttachment } from "../../domain/GuideAttachment";
import { GuideAttachmentRepository } from "../../domain/GuideAttachmentRepository";

export class GuideAttachmentsByGuideSearcher {
	constructor(private readonly repository: GuideAttachmentRepository) {}

	async search(guideId: string): Promise<GuideAttachment[]> {
		return this.repository.searchAllByGuideId(new GuideId(guideId));
	}
}
