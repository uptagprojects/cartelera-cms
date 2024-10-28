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
	avatar: string;
	status: string;
};

export class PostgresUserRepository implements UserRepository {
	constructor(private readonly connection: PostgresConnection) {}

	async matching(criteria: Criteria): Promise<User[]> {
		const converter = new CriteriaToPostgresSqlConverter();
		const { query, params } = converter.convert(
			["id", "name", "email", "avatar", "status"],
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
				status: user.status
			})
		);
	}

	async save(user: User): Promise<void> {
		const userPrimitives = user.toPrimitives();

		const params = [
			userPrimitives.id,
			userPrimitives.name,
			userPrimitives.email,
			userPrimitives.avatar,
			userPrimitives.status
		];

		await this.connection.execute(
			`INSERT INTO cma__users(id, name, email, avatar, status) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (id) DO UPDATE SET name = $2, email = $3, avatar = $4, status = $5`,
			params
		);
	}

	async searchByEmail(email: UserEmail): Promise<User | null> {
		const res = await this.connection.searchOne<DatabaseUser>(
			"SELECT id, name, email, avatar, status FROM cma__users WHERE email = $1 LIMIT 1",
			[email.value]
		);

		if (!res) {
			return null;
		}

		return User.fromPrimitives(res);
	}

	async search(id: UserId): Promise<User | null> {
		const res = await this.connection.searchOne<DatabaseUser>(
			"SELECT id, name, email, avatar, status FROM cma__users WHERE id = $1 LIMIT 1",
			[id.value]
		);
		if (!res) {
			return null;
		}

		return User.fromPrimitives(res);
	}
}
