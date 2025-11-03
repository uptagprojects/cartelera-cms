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
		expect(this.mockSave).toHaveBeenCalledWith(announcement.toPrimitives());

		return Promise.resolve();
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

	async remove(id: AnnouncementId): Promise<void> {
		expect(this.mockRemove).toHaveBeenCalledWith(id);

		return Promise.resolve();
	}

	shouldSearch(announcement: Announcement): void {
		this.mockSearch(new AnnouncementId(announcement.getId()));
		this.mockSearch.mockReturnValueOnce(announcement);
	}

	shouldSearchAll(announcements: Announcement[]): void {
		this.mockSearchAll();
		this.mockSearchAll.mockReturnValueOnce(announcements);
	}

	shouldSearchAndReturnNull(id: AnnouncementId): void {
		this.mockSearch(id);
		this.mockSearch.mockReturnValueOnce(null);
	}

	shouldMatch(criteria: Criteria, announcements: Announcement[]): void {
		this.mockMatching(criteria);
		this.mockMatching.mockReturnValueOnce(announcements);
	}

	shouldSave(announcement: Announcement): void {
		this.mockSave(announcement.toPrimitives());
	}

	shouldRemove(id: AnnouncementId): void {
		this.mockRemove(id);
	}
}
