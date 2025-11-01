import { CoursesByCriteriaSearcher } from "../../../../../../src/contexts/cma/courses/application/search-by-criteria/CoursesByCriteriaSearcher";
import { CriteriaMother } from "../../../../shared/domain/criteria/CriteriaMother";
import { CourseMother } from "../../domain/CourseMother";
import { MockCourseRepository } from "../../infrastructure/MockCourseRepository";

describe("CoursesByCriteriaSearcher should", () => {
	const repository = new MockCourseRepository();
	const coursesSearcher = new CoursesByCriteriaSearcher(repository);

	it("search courses by criteria", async () => {
		const criteria = CriteriaMother.create();
		const expectedCourses = [CourseMother.create(), CourseMother.create()];

		repository.shouldMatch(criteria, expectedCourses);

		const courses = await coursesSearcher.search([], null, null, null, null);

		expect(courses).toHaveLength(2);
	});
});
