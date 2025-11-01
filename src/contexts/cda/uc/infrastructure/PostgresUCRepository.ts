import { Service } from "diod";

import { PostgresConnection } from "../../../shared/infrastructure/PostgresConnection";
import { UC } from "../domain/UC";
import { UCId } from "../domain/UCId";
import { UCRepository } from "../domain/UCRepository";

interface DatabaseUC {
    id: string;
    name: string;
    total_guides: number;
}

@Service()
export class PostgresUCRepository implements UCRepository {
    constructor(private readonly connection: PostgresConnection) {}

    async save(uc: UC): Promise<void> {
        const ucPrimitives = uc.toPrimitives();

        const params = [ucPrimitives.id, ucPrimitives.name, ucPrimitives.totalGuides];

        await this.connection.execute(
            `INSERT INTO cda__uc (id, name, total_guides) VALUES ($1, $2, $3) ON CONFLICT (id) DO UPDATE SET name = $2, total_guides = $3`,
            params
        );
    }

    async searchAll(): Promise<UC[]> {
        const res = await this.connection.searchAll<DatabaseUC>("SELECT id, name, total_guides FROM cda__uc");

        return res.map(r =>
            UC.fromPrimitives({
                id: r.id,
                name: r.name,
                totalGuides: r.total_guides
            })
        );
    }

    async search(id: UCId): Promise<UC | null> {
        const res = await this.connection.searchOne<DatabaseUC>(
            "SELECT id, name, total_guides FROM cda__uc WHERE id = $1 LIMIT 1",
            [id.value]
        );

        if (!res) {
            return null;
        }

        return UC.fromPrimitives({
            id: res.id,
            name: res.name,
            totalGuides: res.total_guides
        });
    }

    async remove(uc: UC): Promise<void> {
        const { id } = uc.toPrimitives();
        await this.connection.execute("DELETE FROM cda__uc WHERE id = $1", [id]);
    }
}
