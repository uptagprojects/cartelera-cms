import { faker } from "@faker-js/faker";

import { CourseName } from "../../../../../src/contexts/cda/courses/domain/CourseName";

export class CourseNameMother {
	static create(value?: string): CourseName {
		return new CourseName(value ?? faker.string.alpha(80));
	}
}
