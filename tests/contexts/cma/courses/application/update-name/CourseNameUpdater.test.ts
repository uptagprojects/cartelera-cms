import { EventNameUpdater } from "../../../../../../src/contexts/cma/courses/application/update-name/courseNameUpdater";
import { Course } from "../../../../../../src/contexts/cma/courses/domain/Course";
import { MockEventBus } from "../../../../shared/infrastructure/MockEventBus";
import { CourseMother } from "../../domain/CourseMother";
import { CourseNameMother } from "../../domain/CourseNameMother";
import { MockCourseRepository } from "../../infrastructure/MockCourseRepository";

describe("CourseNameUpdater should", () => {
	const repository = new MockCourseRepository();
	const eventBus = new MockEventBus();
	const courseNameUpdater = new EventNameUpdater(repository, eventBus);

	it("update course name", async () => {
		const course = CourseMother.create();
		const newName = CourseNameMother.create().value;
		const updatedCourse = Course.fromPrimitives({
			...course.toPrimitives()
		});
		updatedCourse.updateName(newName);

		repository.shouldSearch(course);
		repository.shouldSave();
		eventBus.shouldPublish(updatedCourse.pullDomainEvents());

		await courseNameUpdater.update(course.toPrimitives().id, newName);
	});
});
