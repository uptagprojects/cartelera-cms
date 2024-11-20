import { Service } from "diod";
import { Pool, PoolClient } from "pg";

import { ColumnValue, DatabaseConnection } from "../domain/DatabaseConnection";

@Service()
export class PostgresConnection extends DatabaseConnection {
	private poolInstance: Pool | null = null;
	private connection: PoolClient | null = null;

	get pool(): Pool {
		if (!this.poolInstance) {
			this.poolInstance = new Pool({
				connectionTimeoutMillis: 2000,
				idleTimeoutMillis: 30000,
				max: 30,
				min: 2,
				connectionString:
					process.env.POSTGRES_CONNECTION ??
					"postgres://user:password$@localhost:5432/cartelera?sslmode=disable"
			});
		}

		return this.poolInstance;
	}

	async searchOne<T>(query: string, values?: Array<ColumnValue>): Promise<T | null> {
		const conn = await this.getConnection();
		const result = await conn.query(query, values);

		return result.rows[0] ?? null;
	}

	async searchAll<T>(query: string, values?: ColumnValue[]): Promise<T[]> {
		const conn = await this.getConnection();
		const result = await conn.query(query, values);

		return result.rows;
	}

	async execute(query: string, values?: ColumnValue[]): Promise<void> {
		const conn = await this.getConnection();

		await conn.query(query, values);
	}

	async truncate(table: string): Promise<void> {
		await this.execute(`TRUNCATE TABLE ${table}`, []);
	}

	async truncateAll(): Promise<void> {
		await this.execute(`SELECT truncate_tables($1)`, ["cma"]);
		await this.execute(`SELECT truncate_tables($1)`, ["cda"]);
	}

	async beginTransaction(): Promise<void> {
		this.connection = await this.getConnection();

		await this.connection.query("BEGIN");
	}

	async commit(): Promise<void> {
		await this.connection?.query("COMMIT");
	}

	async release(): Promise<void> {
		await this.connection?.release(true);
		this.connection = null;
	}

	async rollback(): Promise<void> {
		await this.connection?.query("ROLLBACK");
	}

	async close(): Promise<void> {
		if (this.poolInstance !== null) {
			await this.poolInstance.end();
		}
	}

	private async getConnection(): Promise<PoolClient> {
		if (!this.connection) {
			this.connection = await this.pool.connect();
		}

		return this.connection;
	}
}
