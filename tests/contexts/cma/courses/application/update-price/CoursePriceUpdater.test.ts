import { EventPriceUpdater } from "../../../../../../src/contexts/cma/courses/application/update-price/coursePriceUpdater";
import { Course } from "../../../../../../src/contexts/cma/courses/domain/Course";
import { MockEventBus } from "../../../../shared/infrastructure/MockEventBus";
import { CourseMother } from "../../domain/CourseMother";
import { CoursePriceMother } from "../../domain/CoursePriceMother";
import { MockCourseRepository } from "../../infrastructure/MockCourseRepository";

describe("CoursePriceUpdater should", () => {
	const repository = new MockCourseRepository();
	const eventBus = new MockEventBus();
	const coursePriceUpdater = new EventPriceUpdater(repository, eventBus);

	it("update course price", async () => {
		const course = CourseMother.create();
		const newPrice = CoursePriceMother.create().value;
		const updatedCourse = Course.fromPrimitives({
			...course.toPrimitives()
		});
		updatedCourse.updatePrice(newPrice);

		repository.shouldSearch(course);
		repository.shouldSave();
		eventBus.shouldPublish(updatedCourse.pullDomainEvents());

		await coursePriceUpdater.update(course.toPrimitives().id, newPrice);
	});
});
