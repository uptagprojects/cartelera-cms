import { Service } from "diod";
import { DomainEventSubscriber } from "../../../../shared/domain/event/DomainEventSubscriber";
import { DomainEventClass } from "../../../../shared/domain/event/DomainEventClass";
import { UnpublishedScheduleRemover } from "./UnpublishedScheduleRemover";
import { ScheduleDomainEvent } from "../../../../cma/schedule/domain/event/ScheduleDomainEvent";
import { ScheduleArchivedDomainEvent } from "../../../../cma/schedule/domain/event/ScheduleArchivedDomainEvent";
import { ScheduleRemovedDomainEvent } from "../../../../cma/schedule/domain/event/ScheduleRemovedDomainEvent";

@Service()
export class RemoveOnScheduleUnpublished implements DomainEventSubscriber<ScheduleDomainEvent> {
	constructor(private readonly remover: UnpublishedScheduleRemover) { }

	async on(event: ScheduleDomainEvent): Promise<void> {
		await this.remover.remove(event.id);
	}

	subscribedTo(): DomainEventClass[] {
		return [ScheduleArchivedDomainEvent, ScheduleRemovedDomainEvent];
	}

	name(): string {
		return "pnfi.cda.remove_schedule_on_unpublished";
	}
}