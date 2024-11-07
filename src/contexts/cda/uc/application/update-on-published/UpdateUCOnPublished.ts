import { Service } from "diod";

import { UCCreatedDomainEvent } from "../../../../cma/uc/domain/event/UCCreatedDomainEvent";
import { DomainEventClass } from "../../../../shared/domain/event/DomainEventClass";
import { DomainEventSubscriber } from "../../../../shared/domain/event/DomainEventSubscriber";
import { PublishedUCUpdater } from "./PublishedUCUpdater";

@Service()
export class UpdateUCOnPublished implements DomainEventSubscriber<UCCreatedDomainEvent> {
	constructor(private readonly updater: PublishedUCUpdater) {}

	async on(event: UCCreatedDomainEvent): Promise<void> {
		await this.updater.update(event.id, event.name);
	}

	subscribedTo(): DomainEventClass[] {
		return [UCCreatedDomainEvent];
	}

	name(): string {
		return "pnfi.cda.update_uc_on_published";
	}
}
