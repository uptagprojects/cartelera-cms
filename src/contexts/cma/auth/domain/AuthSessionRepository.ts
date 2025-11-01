import { UserId } from "../../users/domain/UserId";
import { AuthSession } from "./AuthSession";

export interface AuthSessionRepository {
    save(session: AuthSession): Promise<void>;
    search(id: string): Promise<AuthSession | null>;
    searchByToken(token: string): Promise<AuthSession | null>;
    remove(session: AuthSession): Promise<void>;
    removeAllByUserId(userId: UserId): Promise<void>;
}
