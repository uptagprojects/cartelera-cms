import { AuthSessionPrimitives } from "../../../../../../src/contexts/cma/auth-sessions/domain/AuthSession";
import { AuthSessionUsedDomainEvent } from "../../../../../../src/contexts/cma/auth-sessions/domain/event/AuthSessionUsedDomainEvent";
import { AuthSessionLastUsedMother } from "../AuthSessionLastUsedMother";
import { AuthSessionTokenMother } from "../AuthSessionTokenMother";


export class AuthSessionUsedDomainEventMother {
    static create(params?: Partial<AuthSessionUsedDomainEvent>): AuthSessionUsedDomainEvent {
        const primitives: Pick<AuthSessionPrimitives, 'token' | 'lastUsed'> = {
            token: AuthSessionTokenMother.create().value,
            lastUsed: AuthSessionLastUsedMother.create().value.toISOString(),
            ...params
        };

        return new AuthSessionUsedDomainEvent(
            primitives.token,
            primitives.lastUsed
        );
    }
}
