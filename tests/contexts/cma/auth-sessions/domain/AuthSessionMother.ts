import { AuthSession, AuthSessionPrimitives } from "../../../../../src/contexts/cma/auth-sessions/domain/AuthSession";
import { UserIdMother } from "../../users/domain/UserIdMother";
import { AuthSessionExpirationMother } from "./AuthSessionExpirationMother";
import { AuthSessionTokenMother } from "./AuthSessionTokenMother";

export class AuthSessionMother {
    static create(params?: Partial<AuthSessionPrimitives>): AuthSession {
        const primitives: AuthSessionPrimitives = {
            token: AuthSessionTokenMother.create().value,
            userId: UserIdMother.create().value,
            expiration: AuthSessionExpirationMother.create().value.toISOString(),
            ...params
        };

        return AuthSession.fromPrimitives(primitives);
    }

    static createExpired(): AuthSession {
        return AuthSessionMother.create({
            expiration: AuthSessionExpirationMother.createExpired().value.toISOString()
        });
    }
}
