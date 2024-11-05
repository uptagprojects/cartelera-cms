import { Announcement } from "../../domain/Announcement";
import { AnnouncementId } from "../../domain/AnnouncementId";
import { AnnouncementRepository } from "../../domain/AnnouncementRepository";

export class AllAnnouncementsSearcher {
	constructor(private readonly repository: AnnouncementRepository) {}

	async searchAll(): Promise<Announcement[]> {
		return this.repository.searchAll();
	}
}
