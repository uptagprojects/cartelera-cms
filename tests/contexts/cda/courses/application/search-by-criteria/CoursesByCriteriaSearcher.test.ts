import { CoursesByCriteriaSearcher } from "../../../../../../src/contexts/cda/courses/application/search-by-criteria/CoursesByCriteriaSearcher";
import { CourseMother } from "../../domain/CourseMother";
import { CriteriaMother } from "../../../../shared/domain/criteria/CriteriaMother";
import { MockCourseRepository } from "../../infrastructure/MockCourseRepository";

describe("CoursesByCriteriaSearcher should", () => {
	const repository = new MockCourseRepository();
	const coursesSearcher = new CoursesByCriteriaSearcher(repository);

	it("search courses by criteria", async () => {
		const criteria = CriteriaMother.create();
		const expectedCourses = [
			CourseMother.create(),
			CourseMother.create()
		];

		repository.shouldMatch(criteria, expectedCourses);

		const courses = await coursesSearcher.search(
			[],
			null,
			null,
			null,
			null
		);

		expect(courses).toHaveLength(2);
	});
});
