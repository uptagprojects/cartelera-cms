import { CourseName } from "@/contexts/cda/courses/domain/CourseName";
import { faker } from "@faker-js/faker";

export class CourseNameMother {
	static create(value?: string): CourseName {
		return new CourseName(value ?? faker.string.alpha(80));
	}
}