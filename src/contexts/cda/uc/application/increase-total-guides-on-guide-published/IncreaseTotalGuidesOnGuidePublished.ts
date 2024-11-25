import { Service } from "diod";

import { GuidePublishedDomainEvent } from "../../../../cma/guides/domain/event/GuidePublishedDomainEvent";
import { DomainEventClass } from "../../../../shared/domain/event/DomainEventClass";
import { DomainEventSubscriber } from "../../../../shared/domain/event/DomainEventSubscriber";
import { UCTotalGuidesIncreaser } from "./UCTotalGuidesIncreaser";

@Service()
export class IncreaseTotalGuidesOnGuidePublished
	implements DomainEventSubscriber<GuidePublishedDomainEvent>
{
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
