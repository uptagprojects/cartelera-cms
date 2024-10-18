import { UserEmail } from "../../domain/UserEmail";
import { UserId } from "../../domain/UserId";
import { UserName } from "../../domain/UserName";
import { UserPassword } from "../../domain/UserPassword";
import { UserRepository } from "../../domain/UserRepository";

export class UserRegistrar {
	constructor(private readonly repository: UserRepository) {}

	async register(id: string, name: string, email: string, password: string): Promise<void> {
		await this.repository.save(
			new UserId(id),
			new UserName(name),
			new UserEmail(email),
			new UserPassword(password)
		);
	}
}
