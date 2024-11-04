import { Service } from "diod";
import { Announcement } from "../../domain/Announcement";
import { AnnouncementId } from "../../domain/AnnouncementId";
import { AnnouncementRepository } from "../../domain/AnnouncementRepository";

@Service()
export class PublishedUCUpdater {
    constructor(
        private readonly repository: AnnouncementRepository,
    ) {}

    async update(id: string, title: string, content: string, type: string): Promise<void> {
        let announcement = await this.repository.search(new AnnouncementId(id));
        
        if (!announcement) {
            announcement = Announcement.create(id, title, content, type);
        } else {
            announcement.updateTitle(title);
            announcement.updateContent(content);
        }

        await this.repository.save(announcement);
    }
}