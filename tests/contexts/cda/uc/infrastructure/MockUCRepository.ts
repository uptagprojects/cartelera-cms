import { UC } from "../../../../../src/contexts/cda/uc/domain/UC";
import { UCId } from "../../../../../src/contexts/cda/uc/domain/UCId";
import { UCRepository } from "../../../../../src/contexts/cda/uc/domain/UCRepository";

export class MockUCRepository implements UCRepository {
	private readonly mockSearch = jest.fn();
	private readonly mockSearchAll = jest.fn();
	private readonly mockSave = jest.fn();
	private readonly mockRemove = jest.fn();

	async save(uc: UC): Promise<void> {
		this.mockSave();
	}

	async search(id: UCId): Promise<UC | null> {
		return this.mockSearch() as Promise<UC | null>;
	}

	async searchAll(): Promise<UC[]> {
		return this.mockSearchAll() as Promise<UC[]>;
	}

	async remove(uc: UC): Promise<void> {
		this.mockRemove();
	}

	shouldSearch(uc: UC | null): void {
		this.mockSearch.mockReturnValueOnce(uc);
	}

	shouldSearchAll(ucs: UC[]): void {
		this.mockSearchAll.mockReturnValueOnce(ucs);
	}

	shouldSave(): void {
		this.mockSave.mockReturnValueOnce(undefined);
	}

	shouldRemove(): void {
		this.mockRemove.mockReturnValueOnce(undefined);
	}
}
