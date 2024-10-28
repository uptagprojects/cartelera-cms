import { UserFinder } from "../../../users/domain/UserFinder";
import { AuthFinder } from "../../domain/AuthFinder";
import { AuthPassword } from "../../domain/AuthPassword";
import { AuthRepository } from "../../domain/AuthRepository";

export class LocalAuthenticator {
	private readonly authFinder: AuthFinder;
	constructor(
		private readonly repository: AuthRepository,
		private readonly userFinder: UserFinder
	) {
		this.authFinder = new AuthFinder(repository);
	}

	async authenticate(email: string, password: string): Promise<boolean> {
		const user = await this.userFinder.findByEmail(email);

		const auth = await this.authFinder.find(user.getId().value);

		return auth.comparePassword(new AuthPassword(password));
	}
}
