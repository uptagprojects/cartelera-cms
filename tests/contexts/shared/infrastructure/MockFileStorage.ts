import { FileStorage } from "../../../../src/contexts/shared/domain/FileStorage";

export class MockFileStorage implements FileStorage {
	private readonly mockSave = jest.fn();
	private readonly mockRemove = jest.fn();

	async save(_path: string, _file: File): Promise<string> {
		return this.mockSave() as Promise<string>;
	}

	async remove(_path: string): Promise<void> {
		this.mockRemove();
	}

	shouldSave(url: string): void {
		this.mockSave.mockReturnValueOnce(url);
	}

	shouldRemove(): void {
		this.mockRemove.mockReturnValueOnce(undefined);
	}
}
