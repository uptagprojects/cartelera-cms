import { EventBus } from "../../../../shared/domain/event/EventBus";
import { Announcement } from "../../domain/Announcement";
import { AnnouncementRepository } from "../../domain/AnnouncementRepository";
import { AnnouncementFinder } from "../find/AnnouncementFinder";

export class AnnouncementPublisher {
    private readonly finder: AnnouncementFinder;

    constructor(
        private readonly repository: AnnouncementRepository,
        private readonly eventBus: EventBus
    ) {
        this.finder = new AnnouncementFinder(repository);
    }

    async publish(id: string): Promise<void> {
        const announcement = await this.findAnnouncement(id);
        announcement.publish();
        await this.repository.save(announcement);
        await this.eventBus.publish(announcement.pullDomainEvents());
    }

    private async findAnnouncement(id: string): Promise<Announcement> {
        return Announcement.fromPrimitives(await this.finder.find(id));
    }
}
