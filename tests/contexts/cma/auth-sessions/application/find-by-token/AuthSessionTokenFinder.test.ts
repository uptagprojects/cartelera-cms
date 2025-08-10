import { AuthSessionTokenFinder } from "../../../../../../src/contexts/cma/auth-sessions/application/find-session-by-token/AuthSessionTokenFinder";
import { AuthSessionDoesNotExistError } from "../../../../../../src/contexts/cma/auth-sessions/domain/AuthSessionDoesNotExistError";
import { AuthSessionIsNotValidError } from "../../../../../../src/contexts/cma/auth-sessions/domain/AuthSessionIsNotValidError";
import { AuthSessionMother } from "../../domain/AuthSessionMother";
import { AuthSessionTokenMother } from "../../domain/AuthSessionTokenMother";
import { MockAuthSessionRepository } from "../../infrastructure/MockAuthSessionRepository";

describe("AuthSessionTokenFinder should", () => {
    const repository = new MockAuthSessionRepository();
    const authSessionTokenFinder = new AuthSessionTokenFinder(repository);

    it("return a session from a valid token", async () => {
        const expectedSession = AuthSessionMother.create();
        const expectedSessionPrimitives = expectedSession.toPrimitives();

        repository.shouldSearch(expectedSession);

        expect(await authSessionTokenFinder.find(expectedSessionPrimitives.token)).toEqual(expectedSessionPrimitives);
    });

    it("throw an error if the session does not exists", async () => {
        const nonExistentToken = AuthSessionTokenMother.create();

        repository.shouldSearchAndReturnNull(nonExistentToken);

        await expect(authSessionTokenFinder.find(nonExistentToken.value)).rejects.toThrow(
            new AuthSessionDoesNotExistError()
        );
    });

    it("throw an error if the session is expired", async () => {
        const expiredSession = AuthSessionMother.createExpired();

        repository.shouldSearch(expiredSession);

        await expect(authSessionTokenFinder.find(expiredSession.getToken().value)).rejects.toThrow(
            new AuthSessionIsNotValidError()
        );
    });

});
