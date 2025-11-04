import { EventBus } from "../../../../shared/domain/events/EventBus";
import { DomainUCFinder } from "../../domain/DomainUCFinder";
import { UCRepository } from "../../domain/UCRepository";

export class UCRemover {
    private readonly finder: DomainUCFinder;

    constructor(
        private readonly repository: UCRepository,
        private readonly eventBus: EventBus
    ) {
        this.finder = new DomainUCFinder(repository);
    }

    async remove(id: string): Promise<void> {
        const uc = await this.finder.find(id);
        await this.repository.remove(uc);
        await this.eventBus.publish(uc.pullDomainEvents());
    }
}
