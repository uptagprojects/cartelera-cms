import { UuidGenerator } from "../../../../src/contexts/shared/domain/UuidGenerator";

export class MockUuidGenerator implements UuidGenerator {
	private mockGenerate = jest.fn();

	async generate(): Promise<string> {
		return this.mockGenerate();
	}

	shouldGenerate(uuid: string): void {
		this.mockGenerate.mockReturnValue(Promise.resolve(uuid));
	}
}
