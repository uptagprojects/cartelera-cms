import { Announcement } from "../../../../../src/contexts/cma/announcements/domain/Announcement";
import { AnnouncementId } from "../../../../../src/contexts/cma/announcements/domain/AnnouncementId";
import { AnnouncementRepository } from "../../../../../src/contexts/cma/announcements/domain/AnnouncementRepository";
import { Criteria } from "../../../../../src/contexts/shared/domain/criteria/Criteria";

export class MockAnnouncementRepository implements AnnouncementRepository {
	private readonly mockSave = jest.fn();
	private savedAnnouncement: Announcement | null = null;
	private readonly mockSearch = jest.fn();
	private readonly mockSearchAll = jest.fn();
	private readonly mockMatching = jest.fn();
	private readonly mockRemove = jest.fn();

	async save(announcement: Announcement): Promise<void> {
		this.mockSave(announcement);
		this.savedAnnouncement = announcement;
	}

	async search(id: AnnouncementId): Promise<Announcement | null> {
		return this.mockSearch(id);
	}

	async searchAll(): Promise<Announcement[]> {
		return this.mockSearchAll();
	}

	async matching(criteria: Criteria): Promise<Announcement[]> {
		return this.mockMatching(criteria);
	}

	async remove(announcement: Announcement): Promise<void> {
		this.mockRemove(announcement);
	}

	shouldSave(): void {
		this.mockSave.mockReturnValue(Promise.resolve());
	}

	shouldSearch(announcement: Announcement | null): void {
		this.mockSearch.mockReturnValue(Promise.resolve(announcement));
	}

	shouldSearchAll(announcements: Announcement[]): void {
		this.mockSearchAll.mockReturnValue(Promise.resolve(announcements));
	}

	shouldMatch(announcements: Announcement[]): void {
		this.mockMatching.mockReturnValue(Promise.resolve(announcements));
	}

	shouldRemove(): void {
		this.mockRemove.mockReturnValue(Promise.resolve());
	}

	assertSaveHaveBeenCalledWith(announcement: Announcement): void {
		expect(this.mockSave).toHaveBeenCalledWith(announcement);
	}

	assertSearchHaveBeenCalledWith(id: AnnouncementId): void {
		expect(this.mockSearch).toHaveBeenCalledWith(id);
	}

	assertSearchAllHaveBeenCalled(): void {
		expect(this.mockSearchAll).toHaveBeenCalled();
	}

	assertMatchingHaveBeenCalledWith(criteria: Criteria): void {
		expect(this.mockMatching).toHaveBeenCalledWith(criteria);
	}

	assertRemoveHaveBeenCalledWith(announcement: Announcement): void {
		expect(this.mockRemove).toHaveBeenCalledWith(announcement);
	}

	getSavedAnnouncement(): Announcement | null {
		return this.savedAnnouncement;
	}
}
