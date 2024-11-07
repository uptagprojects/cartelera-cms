import { PostgresConnection } from "../../../shared/infrastructure/PostgresConnection";
import { UserId } from "../../users/domain/UserId";
import { AuthSession } from "../domain/AuthSession";
import { AuthSessionRepository } from "../domain/AuthSessionRepository";

export class PostgresAuthSessionRepository implements AuthSessionRepository {
	constructor(private readonly connection: PostgresConnection) {}

	async save(session: AuthSession): Promise<void> {
		await this.connection.execute(
			"INSERT INTO cma__auth_session (id, user_id, expires, session_token) VALUES ($1, $2, $3, $4) ON CONFLICT (id) DO UPDATE SET expires_at = $3",
			[session.id, session.userId, session.expires, session.sessionToken]
		);
	}

	async search(id: string): Promise<AuthSession | null> {
		const session = await this.connection.searchOne<AuthSession>(
			"SELECT id, user_id as userId, expires, session_token as sessionToken FROM cma__auth_session WHERE id = $1",
			[id]
		);

		if (!session) {
			return null;
		}

		return session;
	}

	async searchByToken(token: string): Promise<AuthSession | null> {
		const session = await this.connection.searchOne<AuthSession>(
			"SELECT id, user_id as userId, expires, session_token as sessionToken FROM cma__auth_session WHERE session_token = $1",
			[token]
		);

		if (!session) {
			return null;
		}

		return session;
	}

	async remove(session: AuthSession): Promise<void> {
		await this.connection.execute("DELETE FROM cma__auth_session WHERE id = $1", [session.id]);
	}

	async removeAllByUserId(userId: UserId): Promise<void> {
		await this.connection.execute("DELETE FROM cma__auth_session WHERE user_id = $1", [
			userId.value
		]);
	}
}
