import { EventPriceUpdater } from "../../../../../../src/contexts/cma/courses/application/update-abstract/courseAbstractUpdater";
import { Course } from "../../../../../../src/contexts/cma/courses/domain/Course";
import { MockEventBus } from "../../../../shared/infrastructure/MockEventBus";
import { CourseAbstractMother } from "../../domain/CourseAbstractMother";
import { CourseMother } from "../../domain/CourseMother";
import { MockCourseRepository } from "../../infrastructure/MockCourseRepository";

describe("CourseAbstractUpdater should", () => {
	const repository = new MockCourseRepository();
	const eventBus = new MockEventBus();
	const courseAbstractUpdater = new EventPriceUpdater(repository, eventBus);

	it("update course abstract", async () => {
		const course = CourseMother.create();
		const newAbstract = CourseAbstractMother.create().value;
		const updatedCourse = Course.fromPrimitives({
			...course.toPrimitives()
		});
		updatedCourse.updateAbstract(newAbstract);

		repository.shouldSearch(course);
		repository.shouldSave();
		eventBus.shouldPublish(updatedCourse.pullDomainEvents());

		await courseAbstractUpdater.update(course.toPrimitives().id, newAbstract);
	});
});
