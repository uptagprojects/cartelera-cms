import { PostgresConnection } from "../../../shared/infrastructure/PostgresConnection";
import { UserId } from "../../users/domain/UserId";
import { AuthSession } from "../domain/AuthSession";
import { AuthSessionRepository } from "../domain/AuthSessionRepository";

type DatabaseSession = {
    id: string;
    user_id: string;
    session_token: string;
    expires_at: Date;
};

export class PostgresAuthSessionRepository implements AuthSessionRepository {
    constructor(private readonly connection: PostgresConnection) {}

    async save(session: AuthSession): Promise<void> {
        await this.connection.execute(
            "INSERT INTO cma__auth_sessions (id, user_id, expires_at, session_token) VALUES ($1, $2, $3, $4) ON CONFLICT (id) DO UPDATE SET expires_at = $3",
            [session.id, session.userId, session.expires, session.sessionToken]
        );
    }

    async search(id: string): Promise<AuthSession | null> {
        const session = await this.connection.searchOne<DatabaseSession>(
            "SELECT id, user_id, expires_at, session_token FROM cma__auth_sessions WHERE id = $1",
            [id]
        );

        if (!session) {
            return null;
        }

        return {
            id: session.id,
            userId: session.user_id,
            sessionToken: session.session_token,
            expires: session.expires_at
        };
    }

    async searchByToken(token: string): Promise<AuthSession | null> {
        const session = await this.connection.searchOne<DatabaseSession>(
            "SELECT id, user_id, expires_at, session_token FROM cma__auth_sessions WHERE session_token = $1",
            [token]
        );

        if (!session) {
            return null;
        }

        return {
            id: session.id,
            userId: session.user_id,
            sessionToken: session.session_token,
            expires: session.expires_at
        };
    }

    async remove(session: AuthSession): Promise<void> {
        await this.connection.execute("DELETE FROM cma__auth_sessions WHERE id = $1", [session.id]);
    }

    async removeAllByUserId(userId: UserId): Promise<void> {
        await this.connection.execute("DELETE FROM cma__auth_sessions WHERE user_id = $1", [userId.value]);
    }
}
