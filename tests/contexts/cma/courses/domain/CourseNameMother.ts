import { faker } from "@faker-js/faker";

import { CourseName } from "../../../../../src/contexts/cma/courses/domain/CourseName";

export class CourseNameMother {
	static create(value?: string): CourseName {
		return new CourseName(value ?? faker.lorem.words(3));
	}
}
