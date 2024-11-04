import { Service } from "diod";

import { DomainEventClass } from "../../../../shared/domain/event/DomainEventClass";
import { DomainEventSubscriber } from "../../../../shared/domain/event/DomainEventSubscriber";
import { GuidePublishedDomainEvent } from "../../../../cma/guides/domain/event/GuidePublishedDomainEvent";
import { PublishedActivityUpdater } from "./PublishedActivityUpdater";

@Service()
export class UpdateActivityOnGuidePublished implements DomainEventSubscriber<GuidePublishedDomainEvent> {
	constructor(
		private readonly updater: PublishedActivityUpdater
	) {}

	async on(event: GuidePublishedDomainEvent): Promise<void> {
		await this.updater.update(event.id, "guide", event.title, event.content, event.occurredOn);
	}

	subscribedTo(): DomainEventClass[] {
		return [GuidePublishedDomainEvent];
	}

	name(): string {
		return "pnfi.cda.update_activity_on_guide_published";
	}
}