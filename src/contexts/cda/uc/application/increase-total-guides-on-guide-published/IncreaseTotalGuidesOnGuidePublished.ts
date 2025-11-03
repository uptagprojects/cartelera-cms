import { Service } from "diod";

import { GuidePublishedDomainEvent } from "../../../../cma/guides/domain/events/GuidePublishedDomainEvent";
import { DomainEventClass } from "../../../../shared/domain/events/DomainEventClass";
import { DomainEventSubscriber } from "../../../../shared/domain/events/DomainEventSubscriber";
import { UCTotalGuidesIncreaser } from "./UCTotalGuidesIncreaser";

@Service()
export class IncreaseTotalGuidesOnGuidePublished implements DomainEventSubscriber<GuidePublishedDomainEvent> {
    constructor(private readonly increaser: UCTotalGuidesIncreaser) {}

    async on(event: GuidePublishedDomainEvent): Promise<void> {
        await this.increaser.increment(event.ucId);
    }

    subscribedTo(): DomainEventClass[] {
        return [GuidePublishedDomainEvent];
    }

    name(): string {
        return "pnfi.cda.increase_uc_total_guides_on_guide_published";
    }
}
