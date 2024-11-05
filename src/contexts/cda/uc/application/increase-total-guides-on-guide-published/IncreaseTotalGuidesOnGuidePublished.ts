import { Service } from "diod";
import { DomainEventSubscriber } from "../../../../shared/domain/event/DomainEventSubscriber";
import { DomainEventClass } from "../../../../shared/domain/event/DomainEventClass";
import { GuidePublishedDomainEvent } from "../../../../cma/guides/domain/event/GuidePublishedDomainEvent";
import { UCTotalGuidesIncreaser } from "./UCTotalGuidesIncreaser";

@Service()
export class IncreaseTotalGuidesOnGuidePublished implements DomainEventSubscriber<GuidePublishedDomainEvent> {
	constructor(private readonly increaser: UCTotalGuidesIncreaser) {}

	async on(event: GuidePublishedDomainEvent): Promise<void> {
		await this.increaser.increment(event.id);
	}

	subscribedTo(): DomainEventClass[] {
		return [GuidePublishedDomainEvent];
	}

	name(): string {
		return "pnfi.cda.increase_uc_total_guides_on_guide_published";
	}
}