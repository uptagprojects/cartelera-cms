import { Criteria } from "../../../../shared/domain/criteria/Criteria";
import { FiltersPrimitives } from "../../../../shared/domain/criteria/Filter";
import { Course } from "../../domain/Course";
import { CourseRepository } from "../../domain/CourseRepository";

export class CoursesByCriteriaSearcher {
	constructor(private readonly repository: CourseRepository) {}

	async search(
		filters: FiltersPrimitives[],
		orderBy: string | null,
		orderType: string | null,
		pageSize: number | null,
		pageNumber: number | null
	): Promise<Course[]> {
		const criteria = Criteria.fromPrimitives(filters, orderBy, orderType, pageSize, pageNumber);

		return this.repository.matching(criteria);
	}
}
