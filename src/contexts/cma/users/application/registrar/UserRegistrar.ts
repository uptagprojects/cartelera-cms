import { EventBus } from "../../../../shared/domain/event/EventBus";
import { User } from "../../domain/User";
import { UserRepository } from "../../domain/UserRepository";

export class UserRegistrar {
	constructor(
		private readonly repository: UserRepository,
		private readonly eventBus: EventBus
	) {}

	async register(id: string, name: string, email: string, avatar: string): Promise<void> {
		const user = User.create(id, name, email, avatar);
		await this.repository.save(user);
		await this.eventBus.publish(user.pullDomainEvents());
	}
}
