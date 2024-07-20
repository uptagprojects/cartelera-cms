import { CourseId } from "@/contexts/cms/courses/domain/CourseId";
import { faker } from "@faker-js/faker";


export class CourseIdMother {
	static create(value?: string): CourseId {
		return new CourseId(value ?? faker.string.uuid());
	}
}