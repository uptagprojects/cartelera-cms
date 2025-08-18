import { Announcement } from "../../../../../src/contexts/cma/announcements/domain/Announcement";
import { AnnouncementId } from "../../../../../src/contexts/cma/announcements/domain/AnnouncementId";
import { AnnouncementRepository } from "../../../../../src/contexts/cma/announcements/domain/AnnouncementRepository";
import { Criteria } from "../../../../../src/contexts/shared/domain/criteria/Criteria";

export class MockAnnouncementRepository implements AnnouncementRepository {
	private readonly mockSave = jest.fn();
	private readonly mockSearch = jest.fn();
	private readonly mockSearchAll = jest.fn();
	private readonly mockMatching = jest.fn();
	private readonly mockRemove = jest.fn();

	async save(announcement: Announcement): Promise<void> {
		expect(this.mockSave).toHaveBeenCalledWith(announcement.toPrimitives());
	}

	async search(id: AnnouncementId): Promise<Announcement | null> {
		expect(this.mockSearch).toHaveBeenCalledWith(id);

		return this.mockSearch() as Promise<Announcement | null>;
	}

	async searchAll(): Promise<Announcement[]> {
		expect(this.mockSearchAll).toHaveBeenCalled();
		return this.mockSearchAll() as Promise<Announcement[]>;
	}

	async matching(criteria: Criteria): Promise<Announcement[]> {
		expect(this.mockMatching).toHaveBeenCalledWith(criteria);
		return this.mockMatching() as Promise<Announcement[]>;
	}

	async remove(announcement: Announcement): Promise<void> {
		expect(this.mockRemove).toHaveBeenCalledWith(announcement);

		return Promise.resolve();
	}

	shouldSave(announcement: Announcement): void {
		this.mockSave(announcement.toPrimitives());
	}

	shouldSearch(announcement: Announcement): void {
		this.mockSearch(new AnnouncementId(announcement.getId()));
		this.mockSearch.mockReturnValueOnce(announcement);
	}

	shouldSearchAndReturnNull(announcementId: AnnouncementId): void {
		this.mockSearch(announcementId);
		this.mockSearch.mockReturnValueOnce(null);
	}

	shouldSearchAll(announcements: Announcement[]): void {
		this.mockSearchAll.mockReturnValueOnce(announcements);
	}

	shouldMatch(announcements: Announcement[]): void {
		this.mockMatching.mockReturnValueOnce(announcements);
	}

	shouldRemove(announcement: Announcement): void {
		this.mockRemove(announcement);
	}
}
