import { Announcement } from "./Announcement";
import { AnnouncementDoesNotExists } from "./AnnouncementDoesNotExists";
import { AnnouncementId } from "./AnnouncementId";
import { AnnouncementRepository } from "./AnnouncementRepository";


export class AnnouncementFinder {
    constructor(private readonly repository: AnnouncementRepository) {}

    async find(id: string): Promise<Announcement> {
        const announcement = await this.repository.search(new AnnouncementId(id));
        if(!announcement) {
            throw new AnnouncementDoesNotExists(id);
        }

        return announcement;
    }
}