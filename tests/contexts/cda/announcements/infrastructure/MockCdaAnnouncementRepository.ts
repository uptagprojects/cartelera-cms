import { CdaAnnouncement } from "../../../../../src/contexts/cda/announcements/domain/CdaAnnouncement";
import { CdaAnnouncementId } from "../../../../../src/contexts/cda/announcements/domain/CdaAnnouncementId";
import { CdaAnnouncementRepository } from "../../../../../src/contexts/cda/announcements/domain/CdaAnnouncementRepository";

export class MockCdaAnnouncementRepository implements CdaAnnouncementRepository {
	private readonly mockSearch = jest.fn();
	private readonly mockSearchAll = jest.fn();
	private readonly mockSave = jest.fn();
	private readonly mockRemove = jest.fn();

	async save(_announcement: CdaAnnouncement): Promise<void> {
		this.mockSave();
	}

	async search(_id: CdaAnnouncementId): Promise<CdaAnnouncement | null> {
		return this.mockSearch() as Promise<CdaAnnouncement | null>;
	}

	async searchAll(): Promise<CdaAnnouncement[]> {
		return this.mockSearchAll() as Promise<CdaAnnouncement[]>;
	}

	async remove(_announcement: CdaAnnouncement): Promise<void> {
		this.mockRemove();
	}

	shouldSearch(announcement: CdaAnnouncement | null): void {
		this.mockSearch.mockReturnValueOnce(announcement);
	}

	shouldSearchAll(announcements: CdaAnnouncement[]): void {
		this.mockSearchAll.mockReturnValueOnce(announcements);
	}

	shouldSave(): void {
		this.mockSave.mockReturnValueOnce(undefined);
	}

	shouldRemove(): void {
		this.mockRemove.mockReturnValueOnce(undefined);
	}
}
