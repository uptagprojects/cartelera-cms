import { Announcement } from "../../../../../src/contexts/cma/announcements/domain/Announcement";
import { AnnouncementId } from "../../../../../src/contexts/cma/announcements/domain/AnnouncementId";
import { AnnouncementRepository } from "../../../../../src/contexts/cma/announcements/domain/AnnouncementRepository";
import { Criteria } from "../../../../../src/contexts/shared/domain/criteria/Criteria";

export class MockAnnouncementRepository implements AnnouncementRepository {
	private readonly mockSearch = jest.fn();
	private readonly mockSearchAll = jest.fn();
	private readonly mockMatching = jest.fn();
	private readonly mockSave = jest.fn();
	private readonly mockRemove = jest.fn();

	async save(announcement: Announcement): Promise<void> {
		this.mockSave();
	}

	async search(id: AnnouncementId): Promise<Announcement | null> {
		return this.mockSearch() as Promise<Announcement | null>;
	}

	async searchAll(): Promise<Announcement[]> {
		return this.mockSearchAll() as Promise<Announcement[]>;
	}

	async matching(criteria: Criteria): Promise<Announcement[]> {
		return this.mockMatching() as Promise<Announcement[]>;
	}

	async remove(announcement: Announcement): Promise<void> {
		this.mockRemove();
	}

	shouldSearch(announcement: Announcement): void {
		this.mockSearch.mockReturnValueOnce(announcement);
	}

	shouldSearchAll(announcements: Announcement[]): void {
		this.mockSearchAll.mockReturnValueOnce(announcements);
	}

	shouldMatch(criteria: Criteria, announcements: Announcement[]): void {
		this.mockMatching.mockReturnValueOnce(announcements);
	}

	shouldSave(): void {
		this.mockSave.mockReturnValueOnce(undefined);
	}

	shouldRemove(): void {
		this.mockRemove.mockReturnValueOnce(undefined);
	}
}
