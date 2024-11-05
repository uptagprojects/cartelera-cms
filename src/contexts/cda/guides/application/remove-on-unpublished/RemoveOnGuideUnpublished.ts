import { Service } from "diod";
import { DomainEventSubscriber } from "../../../../shared/domain/event/DomainEventSubscriber";
import { UnpublishedGuideRemover } from "./UnpublishedGuideRemover";
import { DomainEventClass } from "../../../../shared/domain/event/DomainEventClass";
import { GuideDomainEvent } from "../../../../cma/guides/domain/event/GuideDomainEvent";
import { GuideArchivedDomainEvent } from "../../../../cma/guides/domain/event/GuideArchivedDomainEvent";
import { GuideRemovedDomainEvent } from "../../../../cma/guides/domain/event/GuideRemovedDomainEvent";

@Service()
export class RemoveOnGuideUnpublished implements DomainEventSubscriber<GuideDomainEvent> {
	constructor(private readonly remover: UnpublishedGuideRemover) {}

	async on(event: GuideDomainEvent): Promise<void> {
		await this.remover.remove(event.id);
	}

	subscribedTo(): DomainEventClass[] {
		return [GuideArchivedDomainEvent, GuideRemovedDomainEvent];
	}

	name(): string {
		return "pnfi.cda.remove_guide_on_unpublished";
	}
}