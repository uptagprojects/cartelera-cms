import crypto from "crypto";

import { EventBus } from "../../../../shared/domain/event/EventBus";
import { User } from "../../domain/User";
import { UserPassword } from "../../domain/UserPassword";
import { UserRepository } from "../../domain/UserRepository";

export class UserRegistrar {
	constructor(
		private readonly repository: UserRepository,
		private readonly eventBus: EventBus
	) {}

	async register(id: string, name: string, email: string, avatar: string): Promise<void> {
		const userPassword = new UserPassword(this.generateRandomPassword());
		const user = User.create(id, name, email, avatar);
		await this.repository.save(user, userPassword);
		await this.eventBus.publish(user.pullDomainEvents());
	}

	private generateRandomPassword(): string {
		return crypto.getRandomValues(new BigUint64Array(1))[0].toString(36);
	}
}
