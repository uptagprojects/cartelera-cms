import { EventPriceUpdater } from "../../../../../../src/contexts/cma/courses/application/update-picture/coursePictureUpdater";
import { Course } from "../../../../../../src/contexts/cma/courses/domain/Course";
import { MockEventBus } from "../../../../shared/infrastructure/MockEventBus";
import { CourseMother } from "../../domain/CourseMother";
import { CoursePictureMother } from "../../domain/CoursePictureMother";
import { MockCourseRepository } from "../../infrastructure/MockCourseRepository";

describe("CoursePictureUpdater should", () => {
	const repository = new MockCourseRepository();
	const eventBus = new MockEventBus();
	const coursePictureUpdater = new EventPriceUpdater(repository, eventBus);

	it("update course picture", async () => {
		const course = CourseMother.create();
		const newPicture = CoursePictureMother.create().value;
		const updatedCourse = Course.fromPrimitives({
			...course.toPrimitives()
		});
		updatedCourse.updatePicture(newPicture);

		repository.shouldSearch(course);
		repository.shouldSave();
		eventBus.shouldPublish(updatedCourse.pullDomainEvents());

		await coursePictureUpdater.update(course.toPrimitives().id, newPicture);
	});
});
