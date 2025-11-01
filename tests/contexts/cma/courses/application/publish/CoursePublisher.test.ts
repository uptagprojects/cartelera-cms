import { CoursePublisher } from "../../../../../../src/contexts/cma/courses/application/publish/CoursePublisher";
import { Course } from "../../../../../../src/contexts/cma/courses/domain/Course";
import { MockEventBus } from "../../../../shared/infrastructure/MockEventBus";
import { CourseAbstractMother } from "../../domain/CourseAbstractMother";
import { CourseDurationMother } from "../../domain/CourseDurationMother";
import { CourseIdMother } from "../../domain/CourseIdMother";
import { CourseInstructorMother } from "../../domain/CourseInstructorMother";
import { CourseLocationMother } from "../../domain/CourseLocationMother";
import { CourseNameMother } from "../../domain/CourseNameMother";
import { CoursePictureMother } from "../../domain/CoursePictureMother";
import { CoursePriceMother } from "../../domain/CoursePriceMother";
import { MockCourseRepository } from "../../infrastructure/MockCourseRepository";

describe("CoursePublisher should", () => {
	const repository = new MockCourseRepository();
	const eventBus = new MockEventBus();
	const coursePublisher = new CoursePublisher(repository, eventBus);

	it("publish a new course", async () => {
		const id = CourseIdMother.create().value;
		const name = CourseNameMother.create().value;
		const abstract = CourseAbstractMother.create().value;
		const picture = CoursePictureMother.create().value;
		const instructor = CourseInstructorMother.create();
		const location = CourseLocationMother.create().value;
		const price = CoursePriceMother.create().value;

		// Create duration with date-only strings (no time)
		const duration = {
			startDate: "2025-12-01T00:00:00.000Z",
			finishDate: "2025-12-31T00:00:00.000Z",
			academicHours: 40
		};

		// Mock Date constructor to return consistent timestamps
		const fixedDate = new Date("2025-11-01T12:00:00.000Z");
		const RealDate = Date;
		global.Date = class extends RealDate {
			constructor(arg?: any) {
				if (arguments.length === 0) {
					super(fixedDate.getTime());
				} else {
					super(arg);
				}
			}
		} as any;

		const course = Course.create(id, name, abstract, picture, instructor, location, duration, price);

		repository.shouldSave();
		eventBus.shouldPublish(course.pullDomainEvents());

		await coursePublisher.post(id, name, abstract, picture, instructor, location, duration, price);

		// Restore Date
		global.Date = RealDate;
	});
});
