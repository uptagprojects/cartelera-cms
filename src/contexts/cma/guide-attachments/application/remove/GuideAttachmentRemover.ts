import { EventBus } from "../../../../shared/domain/event/EventBus";
import { GuideAttachmentFinder } from "../../domain/GuideAttachmentFinder";
import { GuideAttachmentRepository } from "../../domain/GuideAttachmentRepository";

export class GuideAttachmentRemover {
	private readonly finder: GuideAttachmentFinder;
	constructor(
		private readonly repository: GuideAttachmentRepository,
		private readonly eventBus: EventBus
	) {
		this.finder = new GuideAttachmentFinder(repository);
	}

	async remove(id: string): Promise<void> {
		const guideAttachment = await this.finder.find(id);
		await this.repository.remove(guideAttachment);
	}
}
