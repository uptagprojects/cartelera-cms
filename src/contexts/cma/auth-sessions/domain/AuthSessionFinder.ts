import { AuthSession } from "./AuthSession";
import { AuthSessionDoesNotExistError } from "./AuthSessionDoesNotExistError";
import { AuthSessionRepository } from "./AuthSessionRepository";
import { AuthSessionToken } from "./AuthSessionToken";


export class AuthSessionFinder {
    constructor(private readonly repository: AuthSessionRepository) {}

    async find(token: string): Promise<AuthSession> {
        const session = await this.repository.search(new AuthSessionToken(token));
        if (!session) {
            throw new AuthSessionDoesNotExistError();
        }

        return session;
    }
}
