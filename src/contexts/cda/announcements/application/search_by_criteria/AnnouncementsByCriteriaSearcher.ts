import { Criteria } from "../../../../shared/domain/criteria/Criteria";
import { FiltersPrimitives } from "../../../../shared/domain/criteria/Filter";
import { Announcement } from "../../domain/Announcement";
import { AnnouncementRepository } from "../../domain/AnnouncementRepository";

export class UsersByCriteriaSearcher {
	constructor(private readonly repository: AnnouncementRepository) { }

	async search(
		filters: FiltersPrimitives[],
		orderBy: string | null,
		orderType: string | null,
	): Promise<Announcement[]> {
		const criteria = Criteria.fromPrimitives(filters, orderBy, orderType);

		return this.repository.matching(criteria);
	}
}