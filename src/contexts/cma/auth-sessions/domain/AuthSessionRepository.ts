import { UserId } from "../../users/domain/UserId";
import { AuthSession } from "./AuthSession";
import { AuthSessionToken } from "./AuthSessionToken";

export interface AuthSessionRepository {
    save(session: AuthSession): Promise<void>;
    search(token: AuthSessionToken): Promise<AuthSession | null>;
    remove(session: AuthSession): Promise<void>;
    removeAllByUserId(userId: UserId): Promise<void>;
}
