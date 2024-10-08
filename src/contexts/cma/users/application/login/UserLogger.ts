import { UserEmail } from "../../domain/UserEmail";
import { UserPassword } from "../../domain/UserPassword";
import { UserRepository } from "../../domain/UserRepository";

export class UserAuthenticator {
    constructor(private readonly repository: UserRepository) {}

	async authenticateByEmail(email: string, password: string): Promise<User | null> {
		return this.repository.searchByEmailAndPassword(new UserEmail(email), new UserPassword(password));
	}
}