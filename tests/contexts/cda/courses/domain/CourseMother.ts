import { CdaCoursePrimitives, Course } from "../../../../../src/contexts/cda/courses/domain/Course";
import { CourseDurationMother } from "../../../cma/courses/domain/CourseDurationMother";
import { CourseInstructorMother } from "../../../cma/courses/domain/CourseInstructorMother";
import { CoursePriceMother } from "../../../cma/courses/domain/CoursePriceMother";
import { CourseAbstractMother } from "./CourseAbstractMother";
import { CourseIdMother } from "./CourseIdMother";
import { CourseNameMother } from "./CourseNameMother";

export class CourseMother {
	static create(params?: Partial<CdaCoursePrimitives>): Course {
		const primitives: CdaCoursePrimitives = {
			id: CourseIdMother.create().value,
			name: CourseNameMother.create().value,
			abstract: CourseAbstractMother.create().value,
			instructor: CourseInstructorMother.create(),
			duration: CourseDurationMother.create(),
			price: CoursePriceMother.create().value,
			...params
		};

		return Course.fromPrimitives(primitives);
	}
}
