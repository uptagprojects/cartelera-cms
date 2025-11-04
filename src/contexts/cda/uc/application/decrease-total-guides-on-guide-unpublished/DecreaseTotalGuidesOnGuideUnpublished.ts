import { Service } from "diod";

import { GuideArchivedDomainEvent } from "../../../../cma/guides/domain/events/GuideArchivedDomainEvent";
import { GuideRemovedDomainEvent } from "../../../../cma/guides/domain/events/GuideRemovedDomainEvent";
import { DomainEventClass } from "../../../../shared/domain/events/DomainEventClass";
import { DomainEventSubscriber } from "../../../../shared/domain/events/DomainEventSubscriber";
import { UCTotalGuidesDecreaser } from "./UCTotalGuidesDecreaser";

@Service()
export class DecreaseTotalGuidesOnGuideUnpublished
    implements DomainEventSubscriber<GuideArchivedDomainEvent | GuideRemovedDomainEvent>
{
    constructor(private readonly decreaser: UCTotalGuidesDecreaser) {}

    async on(event: GuideArchivedDomainEvent | GuideRemovedDomainEvent): Promise<void> {
        await this.decreaser.decrement(event.ucId);
    }

    subscribedTo(): DomainEventClass[] {
        return [GuideArchivedDomainEvent, GuideRemovedDomainEvent];
    }

    name(): string {
        return "pnfi.cda.decrease_uc_total_guides_on_guide_unpublished";
    }
}
