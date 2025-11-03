import { Service } from "diod";

import { GuideArchivedDomainEvent } from "../../../../cma/guides/domain/events/GuideArchivedDomainEvent";
import { GuideDomainEvent } from "../../../../cma/guides/domain/events/GuideDomainEvent";
import { GuideRemovedDomainEvent } from "../../../../cma/guides/domain/events/GuideRemovedDomainEvent";
import { GuideRestoredDomainEvent } from "../../../../cma/guides/domain/events/GuideRestoredDomainEvent";
import { DomainEventClass } from "../../../../shared/domain/events/DomainEventClass";
import { DomainEventSubscriber } from "../../../../shared/domain/events/DomainEventSubscriber";
import { UnpublishedGuideRemover } from "./UnpublishedGuideRemover";

@Service()
export class RemoveOnGuideUnpublished implements DomainEventSubscriber<GuideDomainEvent> {
    constructor(private readonly remover: UnpublishedGuideRemover) {}

    async on(event: GuideDomainEvent): Promise<void> {
        await this.remover.remove(event.id);
    }

    subscribedTo(): DomainEventClass[] {
        return [GuideArchivedDomainEvent, GuideRemovedDomainEvent, GuideRestoredDomainEvent];
    }

    name(): string {
        return "pnfi.cda.remove_guide_on_unpublished";
    }
}
