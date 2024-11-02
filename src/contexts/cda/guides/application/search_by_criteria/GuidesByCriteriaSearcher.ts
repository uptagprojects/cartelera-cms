import { Criteria } from "../../../../shared/domain/criteria/Criteria";
import { FiltersPrimitives } from "../../../../shared/domain/criteria/Filter";
import { Guide } from "../../domain/Guide";
import { GuideRepository } from "../../domain/GuideRepository";

export class GuidesByCriteriaSearcher {
	constructor(private readonly repository: GuideRepository) {}

	async search(
		filters: FiltersPrimitives[],
		orderBy: string | null,
		orderType: string | null,
		pageSize: number | null,
		pageNumber: number | null
	): Promise<Guide[]> {
		const criteria = Criteria.fromPrimitives(filters, orderBy, orderType, pageSize, pageNumber);

		return this.repository.matching(criteria);
	}
}
