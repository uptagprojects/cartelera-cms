import { Announcement } from "./Announcement";
import { AnnouncementId } from "./AnnouncementId";

export interface AnnouncementRepository {

    search(id: AnnouncementId): Promise<Announcement | null>

}