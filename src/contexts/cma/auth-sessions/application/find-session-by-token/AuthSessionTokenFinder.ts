import { AuthSession, AuthSessionPrimitives } from "../../domain/AuthSession";
import { AuthSessionFinder } from "../../domain/AuthSessionFinder";
import { AuthSessionIsNotValidError } from "../../domain/AuthSessionIsNotValidError";
import { AuthSessionRepository } from "../../domain/AuthSessionRepository";

export class AuthSessionTokenFinder {
    private readonly finder: AuthSessionFinder;
    constructor(repository: AuthSessionRepository) {
        this.finder = new AuthSessionFinder(repository);
    }

    async find(token: string): Promise<AuthSessionPrimitives> {
        const session = await this.finder.find(token);

        await this.ensureIsValid(session);

        return session.toPrimitives();
    }

    private async ensureIsValid(session: AuthSession): Promise<void> {
            if (!session.isValid()) {
                throw new AuthSessionIsNotValidError();
            }
    }
}
