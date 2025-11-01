import { extname } from "path";

import { EventBus } from "../../../../shared/domain/event/EventBus";
import { FileStorage } from "../../../../shared/domain/FileStorage";
import { GuideAttachment } from "../../domain/GuideAttachment";
import { GuideAttachmentRepository } from "../../domain/GuideAttachmentRepository";

export class GuideAttachmentUploader {
    constructor(
        private readonly repository: GuideAttachmentRepository,
        private readonly fileStorage: FileStorage,
        private readonly eventBus: EventBus
    ) {}

    async upload(id: string, guideId: string, file: File): Promise<void> {
        const path = `/guide-attachments/${id}${extname(file.name)}`;

        const url = await this.fileStorage.save(path, file);

        const attachment = GuideAttachment.create(id, file.name, guideId, url, file.size, file.type, path);

        await this.repository.save(attachment);
        await this.eventBus.publish(attachment.pullDomainEvents());
    }
}
