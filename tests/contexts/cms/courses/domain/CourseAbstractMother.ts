import { CourseAbstract } from "@/contexts/cms/courses/domain/CourseAbstract";
import { faker } from "@faker-js/faker";

export class CourseAbstractMother {
	static create(value?: string): CourseAbstract {
		return new CourseAbstract(value ?? faker.string.sample());
	}
}