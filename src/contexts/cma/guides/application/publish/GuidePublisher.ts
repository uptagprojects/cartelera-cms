import { EventBus } from "../../../../shared/domain/event/EventBus";
import { GuideFinder } from "../../domain/GuideFinder";
import { GuideRepository } from "../../domain/GuideRepository";

export class GuidePublisher {
    private readonly finder: GuideFinder;
    constructor(
        private readonly repository: GuideRepository,
        private readonly eventBus: EventBus
    ) {
        this.finder = new GuideFinder(repository);
    }

    async publish(id: string): Promise<void> {
        const guide = await this.finder.find(id);

        guide.publish();
        await this.repository.save(guide);
        await this.eventBus.publish(guide.pullDomainEvents());
    }
}