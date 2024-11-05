import { Service } from "diod";

import { DomainEventClass } from "../../../../shared/domain/event/DomainEventClass";
import { DomainEventSubscriber } from "../../../../shared/domain/event/DomainEventSubscriber";
import { PublishedEventUpdater } from "./PublishedEventUpdater";
import { EventPublishedDomainEvent } from "../../../../cma/events/domain/event/EventPublishedDomainEvent";


@Service()
export class UpdateEventOnPublished implements DomainEventSubscriber<EventPublishedDomainEvent> {
	constructor(private readonly updater: PublishedEventUpdater) {}

	async on(event: EventPublishedDomainEvent): Promise<void> {
		await this.updater.update(
            event.id,
            event.name,
			event.location,
			event.startDate,
			event.endDate
        );
	}

	subscribedTo(): DomainEventClass[] {
		return [EventPublishedDomainEvent];
	}

	name(): string {
		return "pnfi.cda.update_event_on_published";
	}
}
