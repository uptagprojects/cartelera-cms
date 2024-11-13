import { Service } from "diod";

import { AnnouncementPublishedDomainEvent } from "../../../../cma/announcements/domain/event/AnnouncementPublishedDomainEvent";
import { DomainEventClass } from "../../../../shared/domain/event/DomainEventClass";
import { DomainEventSubscriber } from "../../../../shared/domain/event/DomainEventSubscriber";
import { PublishedActivityUpdater } from "./PublishedActivityUpdater";

@Service()
export class UpdateActivityOnAnnouncementPublished
	implements DomainEventSubscriber<AnnouncementPublishedDomainEvent>
{
	constructor(private readonly updater: PublishedActivityUpdater) {}

	async on(event: AnnouncementPublishedDomainEvent): Promise<void> {
		await this.updater.update(
			event.id,
			"announcement",
			event.title,
			event.content,
			event.occurredOn
		);
	}

	subscribedTo(): DomainEventClass[] {
		return [AnnouncementPublishedDomainEvent];
	}

	name(): string {
		return "pnfi.cda.update_activity_on_announcement_published";
	}
}
