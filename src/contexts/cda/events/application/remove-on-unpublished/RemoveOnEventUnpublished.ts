import { Service } from "diod";

import { EventDomainEvent } from "../../../../cma/events/domain/event/EventDomainEvent";
import { EventRemovedDomainEvent } from "../../../../cma/events/domain/event/EventRemovedDomainEvent";
import { DomainEventClass } from "../../../../shared/domain/event/DomainEventClass";
import { DomainEventSubscriber } from "../../../../shared/domain/event/DomainEventSubscriber";
import { UnpublishedEventRemover } from "./UnpublishedEventRemover";

@Service()
export class RemoveOnEventUnpublished implements DomainEventSubscriber<EventDomainEvent> {
	constructor(private readonly remover: UnpublishedEventRemover) {}

	async on(event: EventDomainEvent): Promise<void> {
		await this.remover.remove(event.id);
	}

	subscribedTo(): DomainEventClass[] {
		return [EventRemovedDomainEvent];
	}

	name(): string {
		return "pnfi.cda.remove_event_on_unpublished";
	}
}
