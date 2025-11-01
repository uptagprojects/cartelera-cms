import { faker } from "@faker-js/faker";

import { CourseAbstract } from "../../../../../src/contexts/cma/courses/domain/CourseAbstract";

export class CourseAbstractMother {
	static create(value?: string): CourseAbstract {
		return new CourseAbstract(value ?? faker.lorem.paragraph());
	}
}
