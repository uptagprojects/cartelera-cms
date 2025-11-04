import { UCFinder } from "../../../../../src/contexts/cda/uc/domain/UCFinder";
import { UC } from "../../../../../src/contexts/cda/uc/domain/UC";

export class MockUCFinder extends UCFinder {
	private mockFind = jest.fn();

	constructor() {
		super(null as any);
	}

	async find(id: string): Promise<UC> {
		return this.mockFind() as Promise<UC>;
	}

	shouldFind(uc: UC): void {
		this.mockFind.mockReturnValueOnce(uc);
	}
}
