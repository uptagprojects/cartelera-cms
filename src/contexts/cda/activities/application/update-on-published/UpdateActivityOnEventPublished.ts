import { Service } from "diod";

import { DomainEventClass } from "../../../../shared/domain/event/DomainEventClass";
import { DomainEventSubscriber } from "../../../../shared/domain/event/DomainEventSubscriber";
import { PublishedActivityUpdater } from "./PublishedActivityUpdater";
import { EventPublishedDomainEvent } from "../../../../cma/events/domain/event/EventPublishedDomainEvent";

@Service()
export class UpdateActivityOnEventPublished implements DomainEventSubscriber<EventPublishedDomainEvent> {
	constructor(private readonly updater: PublishedActivityUpdater) {}

	async on(event: EventPublishedDomainEvent): Promise<void> {
		await this.updater.update(event.id, "event", event.name, `${event.startDate}/${event.endDate}`, event.occurredOn);
	}

	subscribedTo(): DomainEventClass[] {
		return [EventPublishedDomainEvent];
	}

	name(): string {
		return "pnfi.cda.update_activity_on_event_published";
	}
}