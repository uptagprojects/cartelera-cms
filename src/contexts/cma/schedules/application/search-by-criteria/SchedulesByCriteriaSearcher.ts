import { Criteria } from "../../../../shared/domain/criteria/Criteria";
import { FiltersPrimitives } from "../../../../shared/domain/criteria/Filter";
import { Schedule } from "../../domain/Schedule";
import { ScheduleRepository } from "../../domain/ScheduleRepository";

export class SchedulesByCriteriaSearcher {
    constructor(private readonly repository: ScheduleRepository) {}

    async search(
        filters: FiltersPrimitives[],
        orderBy: string | null,
        orderType: string | null,
        pageSize: number | null,
        pageNumber: number | null
    ): Promise<Schedule[]> {
        const criteria = Criteria.fromPrimitives(filters, orderBy, orderType, pageSize, pageNumber);

        return this.repository.matching(criteria);
    }
}
