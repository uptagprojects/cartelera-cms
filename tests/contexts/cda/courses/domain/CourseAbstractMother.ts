import { CourseAbstract } from "../../../../../src/contexts/cda/courses/domain/CourseAbstract";
import { faker } from "@faker-js/faker";

export class CourseAbstractMother {
	static create(value?: string): CourseAbstract {
		return new CourseAbstract(value ?? faker.string.sample());
	}
}