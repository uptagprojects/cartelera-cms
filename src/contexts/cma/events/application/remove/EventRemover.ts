import { EventBus } from "../../../../shared/domain/event/EventBus";
import { EventFinder } from "../../domain/EventFinder";
import { EventRepository } from "../../domain/EventRepository";


export class EventRemover {
    private readonly finder: EventFinder;

    constructor (
        private readonly repository: EventRepository,
        private readonly eventBus: EventBus
    ) {
        this.finder = new EventFinder(repository);
    }

    async remove(id: string): Promise<void> {
        const event = await this.finder.find(id);
        await this.repository.remove(event);
        await this.eventBus.publish(event.pullDomainEvents());
    }
}