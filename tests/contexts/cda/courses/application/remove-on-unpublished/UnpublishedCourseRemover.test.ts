import { UnpublishedCourseRemover } from "../../../../../../src/contexts/cda/courses/application/remove-on-unpublished/UnpublishedCourseRemover";
import { CourseMother } from "../../domain/CourseMother";
import { MockCourseRepository } from "../../infrastructure/MockCourseRepository";

describe("UnpublishedCourseRemover should", () => {
	const repository = new MockCourseRepository();
	const remover = new UnpublishedCourseRemover(repository);

	it("remove an existing course", async () => {
		const course = CourseMother.create();

		repository.shouldSearch(course);
		repository.shouldRemove();

		await remover.remove(course.id.value);
	});

	it("do nothing when course does not exist", async () => {
		const course = CourseMother.create();

		repository.shouldSearch(null);

		await remover.remove(course.id.value);
	});
});
