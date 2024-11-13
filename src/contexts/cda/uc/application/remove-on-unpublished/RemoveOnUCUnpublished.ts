import { Service } from "diod";

import { UCRemovedDomainEvent } from "../../../../cma/uc/domain/event/UCRemovedDomainEvent";
import { DomainEventClass } from "../../../../shared/domain/event/DomainEventClass";
import { DomainEventSubscriber } from "../../../../shared/domain/event/DomainEventSubscriber";
import { UnpublishedUCRemover } from "./UnpublishedUCRemover";

@Service()
export class RemoveOnUCUnpublished implements DomainEventSubscriber<UCRemovedDomainEvent> {
	constructor(private readonly remover: UnpublishedUCRemover) {}

	async on(event: UCRemovedDomainEvent): Promise<void> {
		await this.remover.remove(event.id);
	}

	subscribedTo(): DomainEventClass[] {
		return [UCRemovedDomainEvent];
	}

	name(): string {
		return "pnfi.cda.remove_uc_on_unpublished";
	}
}
