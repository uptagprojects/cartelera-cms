import { User } from "../domain/User";
import { UserEmail } from "../domain/UserEmail";
import { UserPassword } from "../domain/UserPassword";
import { UserRepository } from "../domain/UserRepository";
import { PostgresConnection } from "../../../shared/infrastructure/PostgresConnection";
import { UserId } from "../domain/UserId";
import { Criteria } from "../../../shared/domain/criteria/Criteria";
import { CriteriaToPostgresSqlConverter } from "../../../shared/infrastructure/criteria/CriteriaToPostgresSqlConverter";

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
		const { query, params } = converter.convert(["id", "name", "email", "avatar", "status"], "cma__users", criteria)

		const result = await this.connection.searchAll<DatabaseUser>(
			query,
			params
		);

		return result.map((user) =>
			User.fromPrimitives({
				id: user.id,
				name: user.name,
				email: user.email,
				avatar: user.avatar,
				status: user.status
			})
		);
	}

	async save(user: User, password: UserPassword): Promise<void> {
		const userPrimitives = user.toPrimitives();

		await this.connection.execute(
			"INSERT INTO cma__users(id, name, email, password, avatar, status) VALUES ($1, $2, $3, $4, $5, $6)",
			[
				userPrimitives.id,
				userPrimitives.name,
				userPrimitives.email,
				password.value,
				userPrimitives.avatar,
				userPrimitives.status
			]
		);
	}

	async searchByEmailAndPassword(email: UserEmail, password: UserPassword): Promise<User | null> {
		const res = await this.connection.searchOne<DatabaseUser>(
			"SELECT id, name, email, avatar, status FROM cma__users WHERE email = $1 AND password = $2 LIMIT 1",
			[email.value, password.value]
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
