import { EventBus } from "../../../../shared/domain/event/EventBus";
import { GuideFinder } from "../../domain/GuideFinder";
import { GuideRepository } from "../../domain/GuideRepository";

export class GuideTitleUpdater {
    private readonly finder: GuideFinder;
    constructor(
        private readonly repository: GuideRepository,
        private readonly eventBus: EventBus
    ) {
        this.finder = new GuideFinder(repository);
    }

    async update(id: string, title: string): Promise<void> {
        const guide = await this.finder.find(id);
        guide.updateTitle(title);
        await this.repository.save(guide);
        await this.eventBus.publish(guide.pullDomainEvents());
    }
}