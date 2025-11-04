import { UC } from "../../../../../src/contexts/cda/uc/domain/UC";
import { UCFinder } from "../../../../../src/contexts/cda/uc/domain/UCFinder";

export class MockUCFinder extends UCFinder {
	private readonly mockFind = jest.fn();

	constructor() {
		super(null as any);
	}

	async find(_id: string): Promise<UC> {
		return this.mockFind() as Promise<UC>;
	}

	shouldFind(uc: UC): void {
		this.mockFind.mockReturnValueOnce(uc);
	}
}
