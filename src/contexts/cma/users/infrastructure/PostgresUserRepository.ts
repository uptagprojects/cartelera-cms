import { Service } from "diod";

import { Criteria } from "../../../shared/domain/criteria/Criteria";
import { CriteriaToPostgresSqlConverter } from "../../../shared/infrastructure/criteria/CriteriaToPostgresSqlConverter";
import { PostgresConnection } from "../../../shared/infrastructure/PostgresConnection";
import { User } from "../domain/User";
import { UserEmail } from "../domain/UserEmail";
import { UserId } from "../domain/UserId";
import { UserRepository } from "../domain/UserRepository";

type DatabaseUser = {
	id: string;
	name: string;
	email: string;
	emailVerified: Date | null;
	avatar: string;
	status: string;
};

@Service()
export class PostgresUserRepository implements UserRepository {
	constructor(private readonly connection: PostgresConnection) {}

	async matching(criteria: Criteria): Promise<User[]> {
		const converter = new CriteriaToPostgresSqlConverter();
		const { query, params } = converter.convert(
			["id", "name", "email", "email_verified", "avatar", "status"],
			"cma__users",
			criteria
		);

		const result = await this.connection.searchAll<DatabaseUser>(query, params);

		return result.map(user =>
			User.fromPrimitives({
				id: user.id,
				name: user.name,
				email: user.email,
				avatar: user.avatar,
				status: user.status,
				emailVerified: user.emailVerified
			})
		);
	}

	async save(user: User): Promise<void> {
		const userPrimitives = user.toPrimitives();

		const params = [
			userPrimitives.id,
			userPrimitives.name,
			userPrimitives.email,
			userPrimitives.emailVerified,
			userPrimitives.avatar,
			userPrimitives.status
		];

		await this.connection.execute(
			`INSERT INTO cma__users(id, name, email, email_verified, avatar, status) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT (id) DO UPDATE SET name = $2, email = $3, email_verified = $4, avatar = $5, status = $6`,
			params
		);
	}

	async searchByEmail(email: UserEmail): Promise<User | null> {
		const res = await this.connection.searchOne<DatabaseUser>(
			"SELECT id, name, email, email_verified, avatar, status FROM cma__users WHERE email = $1 LIMIT 1",
			[email.value]
		);

		if (!res) {
			return null;
		}

		return User.fromPrimitives(res);
	}

	async search(id: UserId): Promise<User | null> {
		const res = await this.connection.searchOne<DatabaseUser>(
			"SELECT id, name, email, email_verified, avatar, status FROM cma__users WHERE id = $1 LIMIT 1",
			[id.value]
		);
		if (!res) {
			return null;
		}

		return User.fromPrimitives(res);
	}
}
