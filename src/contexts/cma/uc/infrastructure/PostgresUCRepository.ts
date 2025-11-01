import { PostgresConnection } from "../../../shared/infrastructure/PostgresConnection";
import { UCRemovedDomainEvent } from "../domain/event/UCRemovedDomainEvent";
import { UC } from "../domain/UC";
import { UCId } from "../domain/UCId";
import { UCRepository } from "../domain/UCRepository";

export type DatabaseUC = {
    id: string;
    name: string;
};

export class PostgresUCRepository implements UCRepository {
    constructor(private readonly connection: PostgresConnection) {}

    async save(uc: UC): Promise<void> {
        const ucPrimitives = uc.toPrimitives();

        const params = [ucPrimitives.id, ucPrimitives.name];

        await this.connection.execute(
            `INSERT INTO cma__uc(id, name) VALUES ($1, $2) ON CONFLICT (id) DO UPDATE SET name = $2`,
            params
        );
    }

    async search(id: UCId): Promise<UC | null> {
        const res = await this.connection.searchOne<DatabaseUC>("SELECT id, name FROM cma__uc WHERE id = $1 LIMIT 1", [
            id.value
        ]);

        if (!res) {
            return null;
        }

        return UC.fromPrimitives(res);
    }

    async searchAll(): Promise<UC[]> {
        const res = await this.connection.searchAll<DatabaseUC>("SELECT id, name FROM cma__uc", []);

        return res.map(r => UC.fromPrimitives(r));
    }

    async remove(uc: UC): Promise<void> {
        const { id } = uc.toPrimitives();
        uc.record(new UCRemovedDomainEvent(id));
        await this.connection.execute("DELETE FROM cma__uc WHERE id = $1", [id]);
    }
}
