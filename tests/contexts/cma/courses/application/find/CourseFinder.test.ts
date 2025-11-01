import { CourseFinder } from "../../../../../../src/contexts/cma/courses/application/find/CourseFinder";
import { CourseMother } from "../../domain/CourseMother";
import { MockCourseRepository } from "../../infrastructure/MockCourseRepository";

describe("CourseFinder should", () => {
	const repository = new MockCourseRepository();
	const courseFinder = new CourseFinder(repository);

	it("find an existing course", async () => {
		const expectedCourse = CourseMother.create();

		repository.shouldSearch(expectedCourse);

		const course = await courseFinder.find(expectedCourse.toPrimitives().id);

		expect(course).toEqual(expectedCourse);
	});
});
