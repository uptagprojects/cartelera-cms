import { Service } from "diod";

import { GuideArchivedDomainEvent } from "../../../../cma/guides/domain/event/GuideArchivedDomainEvent";
import { DomainEventClass } from "../../../../shared/domain/event/DomainEventClass";
import { DomainEventSubscriber } from "../../../../shared/domain/event/DomainEventSubscriber";
import { GuideRemovedDomainEvent } from "../../../../cma/guides/domain/event/GuideRemovedDomainEvent";
import { UCTotalGuidesDecreaser } from "./UCTotalGuidesDecreaser";

@Service()
export class DecreaseTotalGuidesOnGuideUnpublished
	implements DomainEventSubscriber<GuideArchivedDomainEvent | GuideRemovedDomainEvent >
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
