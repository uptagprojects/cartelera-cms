import { faker } from "@faker-js/faker";

import { CoursePicture } from "../../../../../src/contexts/cma/courses/domain/CoursePicture";

export class CoursePictureMother {
	static create(value?: string): CoursePicture {
		return new CoursePicture(value ?? faker.image.url());
	}
}
