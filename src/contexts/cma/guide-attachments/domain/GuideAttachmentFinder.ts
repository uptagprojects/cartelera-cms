import { GuideAttachment } from "./GuideAttachment";
import { GuideAttachmentDoesNotExist } from "./GuideAttachmentDoesNotExist";
import { GuideAttachmentId } from "./GuideAttachmentId";
import { GuideAttachmentRepository } from "./GuideAttachmentRepository";

export class GuideAttachmentFinder {
	constructor(private readonly repository: GuideAttachmentRepository) {}

	async find(id: string): Promise<GuideAttachment> {
		const attachment = await this.repository.search(new GuideAttachmentId(id));
		if (!attachment) {
			throw new GuideAttachmentDoesNotExist(id);
		}

		return attachment;
	}
}
