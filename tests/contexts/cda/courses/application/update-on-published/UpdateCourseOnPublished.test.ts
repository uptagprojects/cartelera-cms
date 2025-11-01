import { UpdateCourseOnPublished } from "../../../../../../src/contexts/cda/courses/application/update-on-published/UpdateCourseOnPublished";
import { PublishedCourseUpdater } from "../../../../../../src/contexts/cda/courses/application/update-on-published/PublishedCourseUpdater";
import { CoursePublishedDomainEventMother } from "../../../../cma/courses/domain/event/CoursePublishedDomainEventMother";
import { MockCourseRepository } from "../../infrastructure/MockCourseRepository";

describe("UpdateCourseOnPublished should", () => {
	const repository = new MockCourseRepository();
	const subscriber = new UpdateCourseOnPublished(
		new PublishedCourseUpdater(repository)
	);

	it("update a course when it is published", async () => {
		const event = CoursePublishedDomainEventMother.create();

		repository.shouldSearch(null);
		repository.shouldSave();

		await subscriber.on(event);
	});
});
