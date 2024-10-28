import { EventBus } from "../../../../shared/domain/event/EventBus";
import { UserFinder } from "../../domain/UserFinder";
import { UserRepository } from "../../domain/UserRepository";

export class UserBlocker {
	private readonly finder: UserFinder;

	constructor(
		private readonly repository: UserRepository,
		private readonly eventBus: EventBus
	) {
		this.finder = new UserFinder(repository);
	}

	async block(id: string): Promise<void> {
		const user = await this.finder.find(id);

		user.block();

		await this.repository.save(user);
		await this.eventBus.publish(user.pullDomainEvents());
	}
}
