import { RemoveOnCourseUnpublished } from "../../../../../../src/contexts/cda/courses/application/remove-on-unpublished/RemoveOnCourseUnpublished";
import { UnpublishedCourseRemover } from "../../../../../../src/contexts/cda/courses/application/remove-on-unpublished/UnpublishedCourseRemover";
import { CourseMother } from "../../domain/CourseMother";
import { CourseDomainEventMother } from "../../domain/event/CourseDomainEventMother";
import { MockCourseRepository } from "../../infrastructure/MockCourseRepository";

describe("RemoveOnCourseUnpublished should", () => {
	const repository = new MockCourseRepository();
	const subscriber = new RemoveOnCourseUnpublished(
		new UnpublishedCourseRemover(repository)
	);

	it("remove a course when it is unpublished", async () => {
		const course = CourseMother.create();
		const event = CourseDomainEventMother.create({ id: course.id.value });

		repository.shouldSearch(course);
		repository.shouldRemove();

		await subscriber.on(event);
	});
});
