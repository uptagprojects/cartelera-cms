import { EventBus } from "../../../../shared/domain/event/EventBus";
import { EventFinder } from "../../domain/EventFinder";
import { EventRepository } from "../../domain/EventRepository";

export class EventNameUpdater {
    private readonly finder: EventFinder;
    constructor(
        private readonly repository: EventRepository,
        private readonly eventBus: EventBus
    ) {
        this.finder = new EventFinder(repository);
    }

    async update(id: string, name: string): Promise<void> {
        const event = await this.finder.find(id);
        event.updateName(name);
        await this.repository.save(event);
        await this.eventBus.publish(event.pullDomainEvents());
    }
}
