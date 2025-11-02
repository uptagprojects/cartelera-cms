import { PublishedCourseUpdater } from "../../../../../../src/contexts/cda/courses/application/update-on-published/PublishedCourseUpdater";
import { CourseMother } from "../../domain/CourseMother";
import { MockCourseRepository } from "../../infrastructure/MockCourseRepository";
import { CourseDurationMother } from "../../../../cma/courses/domain/CourseDurationMother";
import { CourseInstructorMother } from "../../../../cma/courses/domain/CourseInstructorMother";

describe("PublishedCourseUpdater should", () => {
	const repository = new MockCourseRepository();
	const updater = new PublishedCourseUpdater(repository);

	it("create a new course when it does not exist", async () => {
		const course = CourseMother.create();
		const primitives = course.toPrimitives();

		repository.shouldSearch(null);
		repository.shouldSave();

		await updater.update(
			primitives.id,
			primitives.name,
			primitives.abstract,
			primitives.price,
			primitives.duration,
			primitives.instructor
		);
	});

	it("update an existing course", async () => {
		const course = CourseMother.create();
		const primitives = course.toPrimitives();
		const newName = "Updated Course Name";
		const newAbstract = "Updated abstract";
		const newPrice = 999.99;
		const newDuration = CourseDurationMother.create();
		const newInstructor = CourseInstructorMother.create();

		repository.shouldSearch(course);
		repository.shouldSave();

		await updater.update(
			primitives.id,
			newName,
			newAbstract,
			newPrice,
			newDuration,
			newInstructor
		);
	});
});
