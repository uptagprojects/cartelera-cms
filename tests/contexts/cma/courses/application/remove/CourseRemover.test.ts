import { CourseRemover } from "../../../../../../src/contexts/cma/courses/application/remove/CourseRemover";
import { MockEventBus } from "../../../../shared/infrastructure/MockEventBus";
import { CourseMother } from "../../domain/CourseMother";
import { MockCourseRepository } from "../../infrastructure/MockCourseRepository";

describe("CourseRemover should", () => {
	const repository = new MockCourseRepository();
	const eventBus = new MockEventBus();
	const courseRemover = new CourseRemover(repository, eventBus);

	it("remove an existing course", async () => {
		const course = CourseMother.create();

		repository.shouldSearch(course);
		repository.shouldRemove();
		eventBus.shouldPublish([]);

		await courseRemover.remove(course.toPrimitives().id);
	});
});
