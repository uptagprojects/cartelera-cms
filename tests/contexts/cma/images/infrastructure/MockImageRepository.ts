import { Image } from "../../../../../src/contexts/cma/images/domain/Image";
import { ImageRepository } from "../../../../../src/contexts/cma/images/domain/ImageRepository";

export class MockImageRepository implements ImageRepository {
	private readonly mockSave = jest.fn();

	async save(_image: Image): Promise<void> {
		this.mockSave();
	}

	shouldSave(): void {
		this.mockSave.mockReturnValueOnce(undefined);
	}
}
