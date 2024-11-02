import { Announcement } from "../../domain/Announcement";
import { AnnouncementRepository } from "../../domain/AnnouncementRepository";

export class AllAnnouncementsSearcher {
    constructor(
        private readonly repository: AnnouncementRepository
    ) {}

    async searchAll(): Promise<Announcement[]> {
        return this.repository.searchAll();
    }
}