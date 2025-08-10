import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { UserPrimitives } from "../../users/domain/User";
import { UserId } from "../../users/domain/UserId";
import { AuthSessionExpiration } from "./AuthSessionExpiration";
import { AuthSessionToken } from "./AuthSessionToken";
import { AuthSessionStartedDomainEvent } from "./event/AuthSessionStartedDomainEvent";

export type AuthSessionPrimitives = {
    token: string;
    userId: string;
    expiration: string;
};

export class AuthSession extends AggregateRoot {
    constructor(
        private readonly token: AuthSessionToken,
        private readonly userId: UserId,
        private readonly expiration: AuthSessionExpiration
    ) {
        super();
    }

    static create(token: string, user: UserPrimitives, expiration: Date): AuthSession {
        const currentTimestamp = new Date();
        const session = new AuthSession(
            new AuthSessionToken(token),
            new UserId(user.id),
            new AuthSessionExpiration(expiration)
        );
        
        session.record(
            new AuthSessionStartedDomainEvent(
                token,
                user.id,
                expiration.toISOString(),
                currentTimestamp.toISOString()
            )
        );

        return session;
    }

    static fromPrimitives(primitives: AuthSessionPrimitives): AuthSession {
        return new AuthSession(
            new AuthSessionToken(primitives.token),
            new UserId(primitives.userId),
            new AuthSessionExpiration(new Date(primitives.expiration))
        );
    }

    toPrimitives(): AuthSessionPrimitives {
        return {
            token: this.token.value,
            userId: this.userId.value,
            expiration: this.expiration.value.toISOString()
        };
    }

    private isExpired(): boolean {
        return this.expiration.value <= new Date();
    }


    getToken(): AuthSessionToken {
        return this.token;
    }

    isValid(): boolean {
        return !this.isExpired();
    }
}