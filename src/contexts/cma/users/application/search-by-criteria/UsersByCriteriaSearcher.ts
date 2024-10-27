import { Criteria } from "../../../../shared/domain/criteria/Criteria";
import { FiltersPrimitives } from "../../../../shared/domain/criteria/Filter";
import { UserRepository } from "../../domain/UserRepository";

export class UsersByCriteriaSearcher {
    constructor(private readonly repository: UserRepository) {}

    async search(
        filters: FiltersPrimitives[],
        orderBy: string | null,
        orderType: string | null,
        pageSize: number | null,
        pageNumber: number | null
    ): Promise<any[]> {
        const criteria = Criteria.fromPrimitives(filters, orderBy, orderType, pageSize, pageNumber);
        return this.repository.matching(criteria);
    }
}