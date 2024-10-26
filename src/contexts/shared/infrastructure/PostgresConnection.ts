import { Service } from "diod";
import type { Pool, PoolClient } from "pg";
import pg from "pg";


@Service()
export class PostgresConnection {
	private poolInstance: Pool | null = null;

	private get pool(): Pool {
		if(!this.poolInstance) {
			this.poolInstance = new pg.Pool({
				connectionString:
					process.env.POSTGRES_CONNECTION ??
					"postgres://user:password$@db:5432/cartelera?sslmode=disable"
			});
		}
		return this.poolInstance;
	}

	async searchOne<T>(query: string, values?: any[]): Promise<T | null> {
		let conn: PoolClient | null = null;

		try {
			conn = await this.pool.connect()
			const result = await conn.query(query, values);
			return result.rows[0] ?? null;
		} catch (error) {
			// TO DO: Add logger
			console.error(error);
			return null;
		} finally {
			if(conn) {
				await conn.release();
			}
		}
	}

	async searchAll<T>(query: string, values?: any[]): Promise<T[]> {
		let conn: PoolClient | null = null;

		try {
			conn = await this.pool.connect()
			const result = await conn.query(query, values);
			return result.rows;
		} catch (error) {
			// TO DO: Add logger
			console.error(error);
			throw error;
		} finally {
			if(conn) {
				await conn.release();
			}
		}
	}

	async execute(query: string, values: any[]): Promise<void> {
		let conn: PoolClient | null = null;

		try {
			conn = await this.pool.connect()
			await conn.query(query, values);
		} catch (error) {
			// TO DO: Add logger
			console.error(error);
			throw error;
		} finally {
			if(conn) {
				await conn.release();
			}
		}
	}

	async close(): Promise<void> {
		if(this.poolInstance !== null) {
			await this.poolInstance.end();
		}
	}
}