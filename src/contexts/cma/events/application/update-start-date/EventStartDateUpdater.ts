import { EventBus } from "../../../../shared/domain/events/EventBus";
import { EventFinder } from "../../domain/EventFinder";
import { EventRepository } from "../../domain/EventRepository";

export class EventStartDateUpdater {
    private readonly finder: EventFinder;
    constructor(
        private readonly repository: EventRepository,
        private readonly eventBus: EventBus
    ) {
        this.finder = new EventFinder(repository);
    }

    async update(id: string, startDate: string): Promise<void> {
        const event = await this.finder.find(id);
        event.updateStartDate(startDate);
        await this.repository.save(event);
        await this.eventBus.publish(event.pullDomainEvents());
    }
}
