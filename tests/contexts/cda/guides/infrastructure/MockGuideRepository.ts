import { Guide } from "../../../../../src/contexts/cda/guides/domain/Guide";
import { GuideId } from "../../../../../src/contexts/cda/guides/domain/GuideId";
import { GuideRepository } from "../../../../../src/contexts/cda/guides/domain/GuideRepository";
import { Criteria } from "../../../../../src/contexts/shared/domain/criteria/Criteria";

export class MockGuideRepository implements GuideRepository {
	private readonly mockSearch = jest.fn();
	private readonly mockMatching = jest.fn();
	private readonly mockSave = jest.fn();
	private readonly mockRemove = jest.fn();

	async save(_guide: Guide): Promise<void> {
		this.mockSave();
	}

	async search(_id: GuideId): Promise<Guide | null> {
		return this.mockSearch() as Promise<Guide | null>;
	}

	async matching(_criteria: Criteria): Promise<Guide[]> {
		return this.mockMatching() as Promise<Guide[]>;
	}

	async remove(_guide: Guide): Promise<void> {
		this.mockRemove();
	}

	shouldSearch(guide: Guide | null): void {
		this.mockSearch.mockReturnValueOnce(guide);
	}

	shouldMatch(_criteria: Criteria, guides: Guide[]): void {
		this.mockMatching.mockReturnValueOnce(guides);
	}

	shouldSave(): void {
		this.mockSave.mockReturnValueOnce(undefined);
	}

	shouldRemove(): void {
		this.mockRemove.mockReturnValueOnce(undefined);
	}
}
