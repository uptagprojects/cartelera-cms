import { faker } from "@faker-js/faker";

import { CoursePrice } from "../../../../../src/contexts/cma/courses/domain/CoursePrice";

export class CoursePriceMother {
	static create(value?: number): CoursePrice {
		return new CoursePrice(value ?? faker.number.float({ min: 0, max: 10000, fractionDigits: 2 }));
	}
}
