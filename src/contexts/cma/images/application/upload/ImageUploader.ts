import { UuidGenerator } from "../../../../shared/domain/UuidGenerator";
import { Image } from "../../domain/Image";
import { ImageRepository } from "../../domain/ImageRepository";

export class ImageUploader {
	constructor(
		private readonly uuidGenerator: UuidGenerator,
		private readonly repository: ImageRepository
	) {}

	async upload(content: Buffer): Promise<Image> {
		const img = Image.create(await this.uuidGenerator.generate(), content);

		await this.repository.save(img);

		return img;
	}
}
