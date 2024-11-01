import { EventBus } from "../../../../shared/domain/event/EventBus";
import { AnnouncementRepository } from "../../domain/AnnouncementRepository";
import { AnnouncementFinder } from "../find/AnnouncementFinder";

export class AnnouncementContentUpdater {
    private readonly finder: AnnouncementFinder;
    constructor(
        private readonly repository: AnnouncementRepository,
        private readonly eventBus: EventBus
    ) {
        this.finder = new AnnouncementFinder(repository);
    }

    async update(id: string, content: string): Promise<void> {
        const announcement = await this.finder.find(id);
        announcement.updateContent(content);
        await this.repository.save(announcement);
        await this.eventBus.publish(announcement.pullDomainEvents());
    }
}