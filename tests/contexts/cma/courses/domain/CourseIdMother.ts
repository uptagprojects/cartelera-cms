import { faker } from "@faker-js/faker";

import { CourseId } from "../../../../../src/contexts/cma/courses/domain/CourseId";

export class CourseIdMother {
	static create(value?: string): CourseId {
		return new CourseId(value ?? faker.string.uuid());
	}
}
