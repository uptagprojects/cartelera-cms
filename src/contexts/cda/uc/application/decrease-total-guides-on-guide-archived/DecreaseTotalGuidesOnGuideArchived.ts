import { Service } from "diod";
import { DomainEventSubscriber } from "../../../../shared/domain/event/DomainEventSubscriber";
import { DomainEventClass } from "../../../../shared/domain/event/DomainEventClass";
import { GuideArchivedDomainEvent } from "../../../../cma/guides/domain/event/GuideArchivedDomainEvent";
import { UCTotalGuidesIncreaser } from "../increase-total-guides-on-guide-published/UCTotalGuidesIncreaser";

@Service()
export class DecreaseTotalGuidesOnGuideArchived implements DomainEventSubscriber<GuideArchivedDomainEvent> {
	constructor(private readonly decreaser: UCTotalGuidesIncreaser) {}

	async on(event: GuideArchivedDomainEvent): Promise<void> {
		await this.decreaser.increment(event.id);
	}

	subscribedTo(): DomainEventClass[] {
		return [GuideArchivedDomainEvent];
	}

	name(): string {
		return "pnfi.cda.decrease_uc_total_guides_on_guide_archived";
	}
}