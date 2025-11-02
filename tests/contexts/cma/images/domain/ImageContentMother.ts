import { faker } from "@faker-js/faker";

import { ImageContent } from "../../../../../src/contexts/cma/images/domain/ImageContent";

export class ImageContentMother {
	static create(value?: Buffer): ImageContent {
		return new ImageContent(value ?? Buffer.from(faker.lorem.paragraph()));
	}
}
