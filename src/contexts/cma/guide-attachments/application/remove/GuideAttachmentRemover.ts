import { EventBus } from "../../../../shared/domain/event/EventBus";
import { GuideAttachmentFinder } from "../../domain/GuideAttachmentFinder";
import { GuideAttachmentId } from "../../domain/GuideAttachmentId";
import { GuideAttachmentRepository } from "../../domain/GuideAttachmentRepository";

export class GuideAttachmentRemover {
    private readonly finder: GuideAttachmentFinder;
    constructor(
        private readonly repository: GuideAttachmentRepository,
        private readonly eventBus: EventBus
    ) {
        this.finder = new GuideAttachmentFinder(repository);
        
    }
    remove(id: string) {
        const guideAttachment = this.finder.find(id);
        return this.repository.remove(guideAttachment);
    }
}