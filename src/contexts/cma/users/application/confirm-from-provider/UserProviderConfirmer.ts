import { EventBus } from "../../../../shared/domain/event/EventBus";
import { UserFinder } from "../../domain/UserFinder";
import { UserRepository } from "../../domain/UserRepository";

export class UserProviderConfirmer {
	private readonly finder: UserFinder;
	constructor(
		private readonly repository: UserRepository,
	) {
		this.finder = new UserFinder(repository);
	}

	async confirm(id: string, name?: string, avatar?: string): Promise<void> {
		const user = await this.finder.find(id);

		user.confirm(name, avatar);

		await this.repository.save(user);
	}
}
