import { Pool } from "pg";

import { User } from "../domain/User";
import { UserEmail } from "../domain/UserEmail";
import { UserPassword } from "../domain/UserPassword";
import { UserRepository } from "../domain/UserRepository";

type DatabaseUser = {
	id: string;
	name: string;
	email: string;
	avatar: string;
	status: string;
};

export class PostgresUserRepository implements UserRepository {
	constructor(private readonly pool: Pool) {}
	async save(user: User, password: UserPassword): Promise<void> {
		const client = await this.pool.connect();
		const userPrimitives = user.toPrimitives();

		await client.query(
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
		client.release();
	}

	async searchByEmailAndPassword(email: UserEmail, password: UserPassword): Promise<User | null> {
		const client = await this.pool.connect();
		const res = await client.query<DatabaseUser>(
			"SELECT id, name, email, avatar, status FROM cma__users WHERE email = $1 AND password = $2 LIMIT 1",
			[email.value, password.value]
		);
		client.release();
		if (res.rows.length < 1 || !res.rows[0]) {
			return null;
		}

		return User.fromPrimitives(res.rows[0]);
	}
}
