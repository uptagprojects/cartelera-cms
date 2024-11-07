import { PostgresConnection } from "../../../shared/infrastructure/PostgresConnection";
import { AuthVerificationToken } from "../domain/AuthRecoveryCode";
import { AuthVerificationTokenRepository } from "../domain/AuthVerificationTokenRepository";

export class PostgresAuthVerificationTokenRepository implements AuthVerificationTokenRepository {
	constructor(private readonly connection: PostgresConnection) {}

	async save(verificationToken: AuthVerificationToken): Promise<void> {
		await this.connection.execute(
			"INSERT INTO cma__auth_verification_token (identifier, expires, token) VALUES ($1, $2, $3) ON CONFLICT (id, token) DO UPDATE SET expires = $2",
			[verificationToken.identifier, verificationToken.expires, verificationToken.token]
		);
	}

	async search(id: string, token: string): Promise<AuthVerificationToken | null> {
		const verificationToken = await this.connection.searchOne<AuthVerificationToken>(
			"SELECT identifier, expires, token FROM cma__auth_verification_token WHERE identifier = $1 AND token = $2",
			[id, token]
		);

		if (!verificationToken) {
			return null;
		}

		return verificationToken;
	}

	async remove(verificationToken: AuthVerificationToken): Promise<void> {
		await this.connection.execute(
			"DELETE FROM cma__auth_verification_token WHERE identifier = $1 AND token = $2",
			[verificationToken.identifier, verificationToken.token]
		);
	}
}
