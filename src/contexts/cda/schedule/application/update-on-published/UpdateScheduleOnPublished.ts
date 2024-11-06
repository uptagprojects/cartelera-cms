import { Service } from "diod";
import { DomainEventClass } from "../../../../shared/domain/event/DomainEventClass";
import { DomainEventSubscriber } from "../../../../shared/domain/event/DomainEventSubscriber";
import { PublishedScheduleUpdater } from "./PublishedScheduleUpdater";
import { SchedulePublishedDomainEvent } from "../../../../cma/schedules/domain/event/SchedulePublishedDomainEvent";


@Service()
export class UpdateScheduleOnPublished implements DomainEventSubscriber<SchedulePublishedDomainEvent> {
	constructor(private readonly updater: PublishedScheduleUpdater) {}

	async on(event: SchedulePublishedDomainEvent): Promise<void> {
		await this.updater.update(
            event.id,
			event.name,
            event.startDate,
            event.finishDate,
        );
	}

	subscribedTo(): DomainEventClass[] {
		return [SchedulePublishedDomainEvent];
	}

	name(): string {
		return "pnfi.cda.update_schedule_on_published";
	}
}
