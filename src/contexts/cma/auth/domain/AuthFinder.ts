import { UserId } from "../../users/domain/UserId";
import { Auth } from "./Auth";
import { AuthNotFound } from "./AuthNotFound";
import { AuthRepository } from "./AuthRepository";

export class AuthFinder {
	constructor(private readonly repository: AuthRepository) {}

	async find(id: string): Promise<Auth> {
		const auth = await this.repository.search(new UserId(id));
		if (!auth) {
			throw new AuthNotFound(id);
		}

		return auth;
	}
}
