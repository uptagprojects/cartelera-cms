import { AnnouncementId } from "../../domain/AnnouncementId";
import { AnnouncementRepository } from "../../domain/AnnouncementRepository";

export class UnpublishedAnnouncementRemover {
    constructor(private readonly repository: AnnouncementRepository) {}

    async remove(id: string): Promise<void> {
        const announcement = await this.repository.search(new AnnouncementId(id));
        if (announcement) {
            await this.repository.remove(announcement);
        }
    }
}