import type { Pool } from "pg";
import pg from "pg";

const pool = new pg.Pool({
	connectionString:
		process.env.POSTGRES_CONNECTION ??
		"postgres://user:password$@db:5432/cartelera?sslmode=disable"
});

export const getPool = (): Pool => pool;
