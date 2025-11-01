import { logger } from "../infrastructure/telemetry/telemetry";

export type ColumnValue = string | number | boolean | Date | null;

export abstract class DatabaseConnection {
    abstract searchOne<T>(query: string): Promise<T | null>;

    abstract searchAll<T>(query: string): Promise<T[]>;

    abstract execute(query: string, values: ColumnValue[]): Promise<void>;

    abstract truncate(table: string): Promise<void>;

    abstract beginTransaction(): Promise<void>;

    abstract commit(): Promise<void>;

    abstract rollback(): Promise<void>;

    abstract release(): Promise<void>;

    async transactional<T>(fn: (connection: DatabaseConnection) => Promise<T>): Promise<T> {
        try {
            await this.beginTransaction();

            const result = await fn(this);

            await this.commit();
            await this.release();

            return result;
        } catch (error: unknown) {
            await this.rollback();
            await this.release();

            logger.error("Error executing transaction", { error });

            throw error;
        }
    }
}
