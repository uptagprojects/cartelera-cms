import { faker } from "@faker-js/faker";

import { CourseInstructorPrimitives } from "../../../../../src/contexts/cma/courses/domain/CourseInstructor/CourseInstructor";

export class CourseInstructorMother {
	static create(params?: Partial<CourseInstructorPrimitives>): CourseInstructorPrimitives {
		return {
			name: faker.person.fullName(),
			badge: faker.lorem.word(),
			email: faker.internet.email(),
			avatar: faker.image.avatar(),
			relatedUrl: faker.internet.url(),
			...params
		};
	}
}
