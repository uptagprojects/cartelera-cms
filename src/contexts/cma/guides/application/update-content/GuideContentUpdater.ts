import { EventBus } from "../../../../shared/domain/event/EventBus";
import { GuideFinder } from "../../domain/GuideFinder";
import { GuideRepository } from "../../domain/GuideRepository";

export class GuideContentUpdater {
    private readonly finder: GuideFinder;
    constructor(
        private readonly repository: GuideRepository,
        private readonly eventBus: EventBus
    ) {
        this.finder = new GuideFinder(repository);
    }

    async update(id: string, content: string): Promise<void> {
        const guide = await this.finder.find(id);
        guide.updateContent(content);
        await this.repository.save(guide);
        await this.eventBus.publish(guide.pullDomainEvents());
    }
}
