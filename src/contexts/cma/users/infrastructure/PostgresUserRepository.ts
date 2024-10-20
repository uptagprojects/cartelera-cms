import { Pool } from "pg";

import { User } from "../domain/User";
import { UserEmail } from "../domain/UserEmail";
import { UserId } from "../domain/UserId";
import { UserName } from "../domain/UserName";
import { UserPassword } from "../domain/UserPassword";
import { UserRepository } from "../domain/UserRepository";

type DatabaseUser = {
	id: string;
	name: string;
	email: string;
	password: string;
};

export class PostgresUserRepository implements UserRepository {
	constructor(private readonly pool: Pool) {}
	async save(
		id: UserId,
		name: UserName,
		email: UserEmail,
		password: UserPassword
	): Promise<void> {
		const client = await this.pool.connect();
		await client.query(
			"INSERT INTO cma__users(id, name, email, password) VALUES ($1, $2, $3, $4)",
			[id.value, name.value, email.value, password.value]
		);
		client.release();
	}

	async searchByEmailAndPassword(email: UserEmail, password: UserPassword): Promise<User | null> {
		const client = await this.pool.connect();
		const res = await client.query<DatabaseUser>(
			"SELECT id, name, email, '' as password FROM cma__users WHERE email = $1 AND password = $2 LIMIT 1",
			[email.value, password.value]
		);
		client.release();
		if (res.rows.length < 1 || !res.rows[0]) {
			return null;
		}

		res.rows[0].password = "".padStart(16, " ");

		return User.fromPrimitives(res.rows[0]);
	}
}
