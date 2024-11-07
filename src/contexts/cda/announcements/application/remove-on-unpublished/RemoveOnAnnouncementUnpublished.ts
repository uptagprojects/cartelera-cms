import { Service } from "diod";

import { AnnouncementArchivedDomainEvent } from "../../../../cma/announcements/domain/event/AnnouncementArchivedDomainEvent";
import { AnnouncementDomainEvent } from "../../../../cma/announcements/domain/event/AnnouncementDomainEvent";
import { AnnouncementRemovedDomainEvent } from "../../../../cma/announcements/domain/event/AnnouncementRemovedDomainEvent";
import { DomainEventClass } from "../../../../shared/domain/event/DomainEventClass";
import { DomainEventSubscriber } from "../../../../shared/domain/event/DomainEventSubscriber";
import { UnpublishedAnnouncementRemover } from "./UnpublishedAnnouncementRemover";

@Service()
export class RemoveOnAnnouncementUnpublished
	implements DomainEventSubscriber<AnnouncementDomainEvent>
{
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
