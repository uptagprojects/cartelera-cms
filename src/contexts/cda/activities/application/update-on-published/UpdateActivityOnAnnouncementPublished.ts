import { Service } from "diod";

import { AnnouncementPublishedDomainEvent } from "../../../../cma/announcements/domain/events/AnnouncementPublishedDomainEvent";
import { DomainEventClass } from "../../../../shared/domain/events/DomainEventClass";
import { DomainEventSubscriber } from "../../../../shared/domain/events/DomainEventSubscriber";
import { PublishedActivityUpdater } from "./PublishedActivityUpdater";

@Service()
export class UpdateActivityOnAnnouncementPublished implements DomainEventSubscriber<AnnouncementPublishedDomainEvent> {
    constructor(private readonly updater: PublishedActivityUpdater) {}

    async on(event: AnnouncementPublishedDomainEvent): Promise<void> {
        await this.updater.update(event.id, "announcement", event.title, event.content, event.occurredOn);
    }

    subscribedTo(): DomainEventClass[] {
        return [AnnouncementPublishedDomainEvent];
    }

    name(): string {
        return "pnfi.cda.update_activity_on_announcement_published";
    }
}
