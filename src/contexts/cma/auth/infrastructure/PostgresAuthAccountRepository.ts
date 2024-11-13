import { PostgresConnection } from "../../../shared/infrastructure/PostgresConnection";
import { UserId } from "../../users/domain/UserId";
import { AuthAccount } from "../domain/AuthAccount";
import { AuthAccountRepository } from "../domain/AuthAccountRepository";

type DatabaseAccount = {
	id: string;
	user_id: string;
	provider: string;
	type: string;
	provider_account_id: string;
	access_token: string | null;
	expires_at: string | null;
	refresh_token: string | null;
	id_token: string | null;
	scope: string | null;
	session_state: string | null;
	token_type: string | null;
};

export class PostgresAuthAccountRepository implements AuthAccountRepository {
	constructor(private readonly connection: PostgresConnection) {}

	async save(account: AuthAccount): Promise<void> {
		await this.connection.execute(
			`INSERT INTO cma__auth_accounts (
                id,
                user_id, 
                provider, 
                type, 
                provider_account_id, 
                access_token,
                expires_at,
                refresh_token,
                id_token,
                scope,
                session_state,
                token_type
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
            ON CONFLICT (id) DO UPDATE SET
                user_id = $2,
                provider = $3,
                type = $4,
                provider_account_id = $5,
                access_token = $6,
                expires_at = $7,
                refresh_token = $8,
                id_token = $9,
                scope = $10,
                session_state = $11,
                token_type = $12;
            `,
			[
				account.id,
				account.userId,
				account.provider,
				account.type,
				account.providerAccountId,
				account.access_token,
				account.expires_at,
				account.refresh_token,
				account.id_token,
				account.scope,
				account.session_state ? account.session_state.toString() : null,
				account.token_type
			]
		);
	}

	async search(id: string): Promise<AuthAccount | null> {
		const account = await this.connection.searchOne<DatabaseAccount>(
			"SELECT id, user_id, provider, type, provider_account_id, access_token, expires_at, refresh_token, id_token, scope, session_state, token_type FROM cma__auth_accounts WHERE id = $1",
			[id]
		);

		if (!account) {
			return null;
		}

		return {
			id: account.id,
			userId: account.user_id,
			provider: account.provider,
			type: account.type,
			providerAccountId: account.provider_account_id,
			access_token: account.access_token,
			expires_at: account.expires_at,
			refresh_token: account.refresh_token,
			id_token: account.id_token,
			scope: account.scope,
			session_state: account.session_state,
			token_type: account.token_type
		};
	}

	async searchByProvider(
		provider: string,
		providerAccountId: string
	): Promise<AuthAccount | null> {
		const account = await this.connection.searchOne<DatabaseAccount>(
			"SELECT id, user_id, provider, type, provider_account_id, access_token, expires_at, refresh_token, id_token, scope, session_state, token_type FROM cma__auth_accounts WHERE provider = $1 AND provider_account_id = $2",
			[provider, providerAccountId]
		);

		if (!account) {
			return null;
		}

		return {
			id: account.id,
			userId: account.user_id,
			provider: account.provider,
			type: account.type,
			providerAccountId: account.provider_account_id,
			access_token: account.access_token,
			expires_at: account.expires_at,
			refresh_token: account.refresh_token,
			id_token: account.id_token,
			scope: account.scope,
			session_state: account.session_state,
			token_type: account.token_type
		};
	}

	async remove(session: AuthAccount): Promise<void> {
		await this.connection.execute("DELETE FROM cma__auth_accounts WHERE id = $1", [session.id]);
	}

	async removeAllByUserId(userId: UserId): Promise<void> {
		await this.connection.execute("DELETE FROM cma__auth_accounts WHERE user_id = $1", [
			userId.value
		]);
	}
}
