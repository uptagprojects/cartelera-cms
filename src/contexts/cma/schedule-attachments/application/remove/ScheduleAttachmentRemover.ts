import { EventBus } from "../../../../shared/domain/events/EventBus";
import { FileStorage } from "../../../../shared/domain/FileStorage";
import { ScheduleAttachment } from "../../domain/ScheduleAttachment";
import { ScheduleAttachmentFinder } from "../../domain/ScheduleAttachmentFinder";
import { ScheduleAttachmentRepository } from "../../domain/ScheduleAttachmentRepository";

export class ScheduleAttachmentRemover {
    private readonly finder: ScheduleAttachmentFinder;

    constructor(
        private readonly repository: ScheduleAttachmentRepository,
        private readonly fileStorage: FileStorage,
        private readonly eventBus: EventBus
    ) {
        this.finder = new ScheduleAttachmentFinder(repository);
    }

    async remove(id: string): Promise<void> {
        const attachment: ScheduleAttachment = await this.finder.find(id);
        const { storagePath } = attachment.toPrimitives();
        await this.fileStorage.remove(storagePath);

        await this.repository.remove(attachment);

        await this.eventBus.publish(attachment.pullDomainEvents());
    }
}
