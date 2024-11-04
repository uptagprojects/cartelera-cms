import { GuideId } from "../../guides/domain/GuideId";
import { GuideAttachment } from "./GuideAttachment";
import { GuideAttachmentDoesNotExist } from "./GuideAttachmentDoesNotExist";
import { GuideAttachmentId } from "./GuideAttachmentId";
import { GuideAttachmentRepository } from "./GuideAttachmentRepository";

export class GuideAttachmentFinder {
	constructor(private readonly repository: GuideAttachmentRepository) {}

	async find(id: string): Promise<GuideAttachment> {
		const guideAttachment = await this.repository.search(new GuideAttachmentId(id));
		if (!guideAttachment) {
			throw new GuideAttachmentDoesNotExist(id);
		}

		return guideAttachment;
	}

	async searchAllByGuideId(guideId: string): Promise<GuideAttachment[]> {
		return this.repository.searchAllByGuideId(new GuideId(guideId));
	}
}
