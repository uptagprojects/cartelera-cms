import { PostgresConnection } from "../../../shared/infrastructure/PostgresConnection";
import { CredentialExternalId } from "../domain/CredentialExternalId";
import { CredentialId } from "../domain/CredentialId";
import { CredentialRepository } from "../domain/CredentialRepository";
import { DomainCredential } from "../domain/DomainCredential";

type DatabaseCredential = {
	id: string;
	name: string;
	user_id: string;
	external_id: string;
	public_key: string;
	sign_count: number;
};

export class PostgresCredentialRepository implements CredentialRepository {
	constructor(private readonly connnection: PostgresConnection) {}
	async save(credential: DomainCredential): Promise<void> {
		const primitives = credential.toPrimitives();

		await this.connnection.execute(
			"INSERT INTO credentials (id, name, user_id, external_id, public_key, sign_count) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT (id, external_id) DO UPDATE SET sign_count = $6",
			[
				primitives.id,
				primitives.name,
				primitives.userId,
				primitives.externalId,
				primitives.publicKey,
				primitives.signCount
			]
		);
	}

	async search(id: CredentialId): Promise<DomainCredential | null> {
		const res = await this.connnection.searchOne<DatabaseCredential>(
			"SELECT id, name, user_id, external_id, public_key, sign_count FROM credentials WHERE id = $1",
			[id.value]
		);

		if (!res) {
			return null;
		}

		return DomainCredential.fromPrimitives({
			id: res.id,
			name: res.name,
			userId: res.user_id,
			externalId: res.external_id,
			publicKey: res.public_key,
			signCount: res.sign_count
		});
	}

	async searchByExternalId(externalId: CredentialExternalId): Promise<DomainCredential | null> {
		const res = await this.connnection.searchOne<DatabaseCredential>(
			"SELECT id, name, user_id, external_id, public_key, sign_count FROM credentials WHERE external_id = $1",
			[externalId.value]
		);

		if (!res) {
			return null;
		}

		return DomainCredential.fromPrimitives({
			id: res.id,
			name: res.name,
			userId: res.user_id,
			externalId: res.external_id,
			publicKey: res.public_key,
			signCount: res.sign_count
		});
	}
}
