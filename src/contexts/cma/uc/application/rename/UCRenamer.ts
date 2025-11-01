import { EventBus } from "../../../../shared/domain/event/EventBus";
import { UC } from "../../domain/UC";
import { UCRepository } from "../../domain/UCRepository";
import { UCFinder } from "../find/UCFinder";

export class UCRenamer {
    private readonly finder: UCFinder;
    constructor(
        private readonly repository: UCRepository,
        private readonly eventBus: EventBus
    ) {
        this.finder = new UCFinder(repository);
    }

    async rename(id: string, name: string): Promise<void> {
        const uc = await this.findUC(id);
        uc.rename(name);
        await this.repository.save(uc);
        await this.eventBus.publish(uc.pullDomainEvents());
    }

    private async findUC(id: string): Promise<UC> {
        return UC.fromPrimitives(await this.finder.find(id));
    }
}
