import { CourseLocationUpdater } from "../../../../../../src/contexts/cma/courses/application/update-location/CourseLocationUpdater";
import { Course } from "../../../../../../src/contexts/cma/courses/domain/Course";
import { MockEventBus } from "../../../../shared/infrastructure/MockEventBus";
import { CourseLocationMother } from "../../domain/CourseLocationMother";
import { CourseMother } from "../../domain/CourseMother";
import { MockCourseRepository } from "../../infrastructure/MockCourseRepository";

describe("CourseLocationUpdater should", () => {
	const repository = new MockCourseRepository();
	const eventBus = new MockEventBus();
	const courseLocationUpdater = new CourseLocationUpdater(repository, eventBus);

	it("update course location", async () => {
		const course = CourseMother.create();
		const newLocation = CourseLocationMother.create().value;
		const updatedCourse = Course.fromPrimitives({
			...course.toPrimitives()
		});
		updatedCourse.updateLocation(newLocation);

		repository.shouldSearch(course);
		repository.shouldSave();
		eventBus.shouldPublish(updatedCourse.pullDomainEvents());

		await courseLocationUpdater.update(course.toPrimitives().id, newLocation);
	});
});
