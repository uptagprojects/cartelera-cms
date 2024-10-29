import { EventBus } from "../../../../shared/domain/event/EventBus";
import { GuideAttachment } from "../../domain/GuideAttachment";
import { GuideAttachmentRepository } from "../../domain/GuideAttachmentRepository";

export class GuideAttachmentUploader {
	constructor(
		private readonly repository: GuideAttachmentRepository,
		private readonly eventBus: EventBus
	) {}

	async upload(id: string, guideId: string, url: string): Promise<void> {
		// TO DO: Implement the upload logic
		const guideAttachment = GuideAttachment.create(id, guideId, url);
		await this.repository.save(guideAttachment);
		await this.eventBus.publish(guideAttachment.pullDomainEvents());
	}
}
