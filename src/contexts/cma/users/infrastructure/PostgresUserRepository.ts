import { User } from "../domain/User";
import { UserEmail } from "../domain/UserEmail";
import { UserPassword } from "../domain/UserPassword";
import { UserRepository } from "../domain/UserRepository";
import { PostgresConnection } from "../../../shared/infrastructure/PostgresConnection";

type DatabaseUser = {
	id: string;
	name: string;
	email: string;
	avatar: string;
	status: string;
};

export class PostgresUserRepository implements UserRepository {
	constructor(private readonly connection: PostgresConnection) {}
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
}
