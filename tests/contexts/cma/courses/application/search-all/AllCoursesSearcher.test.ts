import { AllCoursesSearcher } from "../../../../../../src/contexts/cma/courses/application/search-all/AllCoursesSearcher";
import { CourseMother } from "../../domain/CourseMother";
import { MockCourseRepository } from "../../infrastructure/MockCourseRepository";

describe("AllCoursesSearcher should", () => {
	const repository = new MockCourseRepository();
	const allCoursesSearcher = new AllCoursesSearcher(repository);

	it("search all courses", async () => {
		const expectedCourses = [CourseMother.create(), CourseMother.create()];

		repository.shouldSearchAll(expectedCourses);

		const courses = await allCoursesSearcher.searchAll();

		expect(courses).toHaveLength(2);
	});
});
