import { User, UserPrimitives } from "../../domain/User";
import { UserDoesNotExistError } from "../../domain/UserDoesNotExistError";
import { UserEmailIsNotValidError } from "../../domain/UserEmailIsNotValidError";
import { UserFinder } from "../../domain/UserFinder";
import { UserIsNotActiveError } from "../../domain/UserIsNotActiveError";
import { UserRepository } from "../../domain/UserRepository";

export type UserEmailFinderErrors =
	| UserIsNotActiveError
	| UserEmailIsNotValidError
	| UserDoesNotExistError;

export class UserEmailFinder {
	private readonly finder: UserFinder;
	constructor(repository: UserRepository) {
		this.finder = new UserFinder(repository);
	}

	async find(email: string): Promise<UserPrimitives> {
		const user = await this.finder.findByEmail(email);

		await this.ensureIsActive(user);

		return user.toPrimitives();
	}

	private async ensureIsActive(user: User): Promise<void> {
		if (!user.isActive()) {
			throw new UserIsNotActiveError(user.getId());
		}
	}
}
