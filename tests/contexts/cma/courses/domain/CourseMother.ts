import { Course, CoursePrimitives } from "../../../../../src/contexts/cma/courses/domain/Course";
import { CourseAbstractMother } from "./CourseAbstractMother";
import { CourseDurationMother } from "./CourseDurationMother";
import { CourseIdMother } from "./CourseIdMother";
import { CourseInstructorMother } from "./CourseInstructorMother";
import { CourseLocationMother } from "./CourseLocationMother";
import { CourseNameMother } from "./CourseNameMother";
import { CoursePictureMother } from "./CoursePictureMother";
import { CoursePriceMother } from "./CoursePriceMother";

export class CourseMother {
	static create(params?: Partial<CoursePrimitives>): Course {
		const defaultCreationDate = new Date();
		const defaultLastUpdateDate = new Date();

		const primitives: CoursePrimitives = {
			id: CourseIdMother.create().value,
			name: CourseNameMother.create().value,
			abstract: CourseAbstractMother.create().value,
			instructor: CourseInstructorMother.create(),
			picture: CoursePictureMother.create().value,
			location: CourseLocationMother.create().value,
			duration: CourseDurationMother.create(),
			price: CoursePriceMother.create().value,
			creation: defaultCreationDate.toISOString(),
			lastUpdate: defaultLastUpdateDate.toISOString(),
			...params
		};

		return Course.fromPrimitives(primitives);
	}
}
