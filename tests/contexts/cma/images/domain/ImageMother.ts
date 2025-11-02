import { Image, ImagePrimitives } from "../../../../../src/contexts/cma/images/domain/Image";
import { ImageIdMother } from "./ImageIdMother";

export class ImageMother {
	static create(params?: Partial<ImagePrimitives>): Image {
		const primitives: ImagePrimitives = {
			id: ImageIdMother.create().value,
			url: "",
			...params
		};

		return Image.fromPrimitives(primitives);
	}
}
