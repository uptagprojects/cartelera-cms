import { Criteria } from "../../../../shared/domain/criteria/Criteria";
import { FiltersPrimitives } from "../../../../shared/domain/criteria/Filter";
import { AnnouncementPrimitives } from "../../domain/Announcement";
import { AnnouncementRepository } from "../../domain/AnnouncementRepository";

export class AnnouncementsByCriteriaSearcher {
	constructor(private readonly repository: AnnouncementRepository) {}

	async search(
		filters: FiltersPrimitives[],
		orderBy: string | null,
		orderType: string | null,
		pageSize: number | null,
		pageNumber: number | null
	): Promise<AnnouncementPrimitives[]> {
		const criteria = Criteria.fromPrimitives(filters, orderBy, orderType, pageSize, pageNumber);

		return (await this.repository.matching(criteria)).map(announcement =>
			announcement.toPrimitives()
		);
	}
}
