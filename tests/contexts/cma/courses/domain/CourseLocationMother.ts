import { faker } from "@faker-js/faker";

import { CourseLocation } from "../../../../../src/contexts/cma/courses/domain/CourseLocation";

export class CourseLocationMother {
	static create(value?: string): CourseLocation {
		return new CourseLocation(value ?? faker.location.city());
	}
}
