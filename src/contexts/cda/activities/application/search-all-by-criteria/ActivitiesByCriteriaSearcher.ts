import { Criteria } from "../../../../shared/domain/criteria/Criteria";
import { FiltersPrimitives } from "../../../../shared/domain/criteria/Filter";
import { Activity } from "../../domain/Activity";
import { ActivityRepository } from "../../domain/ActivityRepository";

export class ActivitiesByCriteriaSearcher {
	constructor(private readonly repository: ActivityRepository) {}

	async search(
		filters: FiltersPrimitives[],
		orderBy: string | null,
		orderType: string | null,
		pageSize: number | null,
		pageNumber: number | null
	): Promise<Activity[]> {
		const criteria = Criteria.fromPrimitives(filters, orderBy, orderType, pageSize, pageNumber);

		return this.repository.matching(criteria);
	}
}
