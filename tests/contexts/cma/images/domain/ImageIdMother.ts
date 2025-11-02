import { faker } from "@faker-js/faker";

import { ImageId } from "../../../../../src/contexts/cma/images/domain/ImageId";

export class ImageIdMother {
	static create(value?: string): ImageId {
		return new ImageId(value ?? faker.string.uuid());
	}
}
