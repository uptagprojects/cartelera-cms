import { Announcement } from '../../domain/Announcement';
import { AnnouncementId } from '../../domain/AnnouncementId';
import { AnnouncementRepository } from '../../domain/AnnouncementRepository';

export class AnnouncementSearcher {
    constructor(private readonly repository: AnnouncementRepository) { }

    async search(id: string): Promise<Announcement | null> {
        return this.repository.search(new AnnouncementId(id));
    }
}