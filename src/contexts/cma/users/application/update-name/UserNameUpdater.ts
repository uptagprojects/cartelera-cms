import { EventBus } from "../../../../shared/domain/events/EventBus";
import { UserFinder } from "../../domain/UserFinder";
import { UserRepository } from "../../domain/UserRepository";

export class UserNameUpdater {
    private readonly finder: UserFinder;

    constructor(
        private readonly repository: UserRepository,
        private readonly eventBus: EventBus
    ) {
        this.finder = new UserFinder(repository);
    }

    async update(id: string, name: string): Promise<void> {
        const user = await this.finder.find(id);

        user.updateName(name);

        await this.repository.save(user);
        await this.eventBus.publish(user.pullDomainEvents());
    }
}
