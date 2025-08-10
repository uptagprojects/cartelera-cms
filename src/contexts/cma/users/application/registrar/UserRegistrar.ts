import { EventBus } from "../../../../shared/domain/event/EventBus";
import { User } from "../../domain/User";
import { UserFinder } from "../../domain/UserFinder";
import { UserRepository } from "../../domain/UserRepository";

export class UserRegistrar {
    private readonly finder: UserFinder;
    constructor(
        private readonly repository: UserRepository,
        private readonly eventBus: EventBus
    ) {
        this.finder = new UserFinder(repository);
    }

    async register(id: string, name: string, email: string, avatar: string, presenterUserId: string): Promise<void> {
        // verify who is registering users
        const presenter = await this.finder.find(presenterUserId);
        await this.verifyPresenterPermissions(presenter);

        const user = User.create(id, name, email, avatar, presenter);
        await this.repository.save(user);
        await this.eventBus.publish(user.pullDomainEvents());
    }

    private async verifyPresenterPermissions(_: User): Promise<void> {
        "temp access";
    }
}
