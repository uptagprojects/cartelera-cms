import { Service } from "diod";

import { AnnouncementArchivedDomainEvent } from "../../../../cma/announcements/domain/events/AnnouncementArchivedDomainEvent";
import { AnnouncementDomainEvent } from "../../../../cma/announcements/domain/events/AnnouncementDomainEvent";
import { AnnouncementRemovedDomainEvent } from "../../../../cma/announcements/domain/events/AnnouncementRemovedDomainEvent";
import { DomainEventClass } from "../../../../shared/domain/events/DomainEventClass";
import { DomainEventSubscriber } from "../../../../shared/domain/events/DomainEventSubscriber";
import { UnpublishedAnnouncementRemover } from "./UnpublishedAnnouncementRemover";

@Service()
export class RemoveOnAnnouncementUnpublished implements DomainEventSubscriber<AnnouncementDomainEvent> {
    constructor(private readonly remover: UnpublishedAnnouncementRemover) {}

    async on(event: AnnouncementDomainEvent): Promise<void> {
        await this.remover.remove(event.id);
    }

    subscribedTo(): DomainEventClass[] {
        return [AnnouncementRemovedDomainEvent, AnnouncementArchivedDomainEvent];
    }

    name(): string {
        return "pnfi.cda.remove_announcement_on_unpublished";
    }
}
