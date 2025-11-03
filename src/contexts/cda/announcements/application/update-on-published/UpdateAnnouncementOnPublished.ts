import { Service } from "diod";

import { AnnouncementPublishedDomainEvent } from "../../../../cma/announcements/domain/events/AnnouncementPublishedDomainEvent";
import { DomainEventClass } from "../../../../shared/domain/events/DomainEventClass";
import { DomainEventSubscriber } from "../../../../shared/domain/events/DomainEventSubscriber";
import { PublishedAnnouncementUpdater } from "./PublishedAnnouncementUpdater";

@Service()
export class UpdateAnnouncementOnPublished implements DomainEventSubscriber<AnnouncementPublishedDomainEvent> {
    constructor(private readonly updater: PublishedAnnouncementUpdater) {}

    async on(event: AnnouncementPublishedDomainEvent): Promise<void> {
        await this.updater.update(event.id, event.title, event.content, event.type);
    }

    subscribedTo(): DomainEventClass[] {
        return [AnnouncementPublishedDomainEvent];
    }

    name(): string {
        return "pnfi.cda.update_announcement_on_published";
    }
}
