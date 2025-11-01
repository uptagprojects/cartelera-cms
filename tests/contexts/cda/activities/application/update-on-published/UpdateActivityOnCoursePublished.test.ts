import { PublishedActivityUpdater } from "../../../../../../src/contexts/cda/activities/application/update-on-published/PublishedActivityUpdater";
import { UpdateActivityOnCoursePublished } from "../../../../../../src/contexts/cda/activities/application/update-on-published/UpdateActivityOnCoursePublished";
import { CoursePublishedDomainEventMother } from "../../../../cma/courses/domain/event/CoursePublishedDomainEventMother";
import { MockMarkdownRemover } from "../../../../shared/infrastructure/MockMarkdownRemover";
import { MockActivityRepository } from "../../infrastructure/MockActivityRepository";

describe("UpdateActivityOnCoursePublished should", () => {
	const repository = new MockActivityRepository();
	const mdRemover = new MockMarkdownRemover();
	const updater = new PublishedActivityUpdater(repository, mdRemover);
	const subscriber = new UpdateActivityOnCoursePublished(updater);

	it("update activity when a course is published", async () => {
		const event = CoursePublishedDomainEventMother.create();
		const contextWithoutMarkdown = event.abstract.replace(/[#*_`]/g, "");

		repository.shouldSearch(null);
		mdRemover.shouldRemove(event.abstract, contextWithoutMarkdown);
		repository.shouldSave();

		await subscriber.on(event);
	});
});
