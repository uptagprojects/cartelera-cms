import { EventBus } from "../../../../shared/domain/event/EventBus";
import { FileStorage } from "../../../../shared/domain/FileStorage";
import { GuideAttachment } from "../../domain/GuideAttachment";
import { GuideAttachmentFinder } from "../../domain/GuideAttachmentFinder";
import { GuideAttachmentRepository } from "../../domain/GuideAttachmentRepository";

export class GuideAttachmentRemover {
    private readonly finder: GuideAttachmentFinder;

    constructor(
        private readonly repository: GuideAttachmentRepository,
        private readonly fileStorage: FileStorage,
        private readonly eventBus: EventBus
    ) {
        this.finder = new GuideAttachmentFinder(repository);
    }

    async remove(id: string): Promise<void> {
        const attachment: GuideAttachment = await this.finder.find(id);
        const { storagePath } = attachment.toPrimitives();
        await this.fileStorage.remove(storagePath);

        await this.repository.remove(attachment);

        await this.eventBus.publish(attachment.pullDomainEvents());
    }
}
