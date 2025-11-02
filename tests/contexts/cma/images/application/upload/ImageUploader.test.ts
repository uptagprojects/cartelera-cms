import { ImageUploader } from "../../../../../../src/contexts/cma/images/application/upload/ImageUploader";
import { MockUuidGenerator } from "../../../../shared/infrastructure/MockUuidGenerator";
import { ImageIdMother } from "../../domain/ImageIdMother";
import { MockImageRepository } from "../../infrastructure/MockImageRepository";

describe("ImageUploader should", () => {
	const uuidGenerator = new MockUuidGenerator();
	const repository = new MockImageRepository();
	const imageUploader = new ImageUploader(uuidGenerator, repository);

	it("upload an image", async () => {
		const id = ImageIdMother.create();
		const content = Buffer.from("test image content");

		uuidGenerator.shouldGenerate(id.value);
		repository.shouldSave();

		const uploadedImage = await imageUploader.upload(content);

		expect(uploadedImage.id.value).toBe(id.value);
		expect(uploadedImage.content.value).toEqual(content);
	});
});
