import { Criteria } from "../../../shared/domain/criteria/Criteria";
import { Announcement } from "./Announcement";
import { AnnouncementId } from "./AnnouncementId";

export interface AnnouncementRepository {
    save(announcement: Announcement): Promise<void>;

    search(id: AnnouncementId): Promise<Announcement | null>;

    searchAll(): Promise<Announcement[]>;

    matching(criteria: Criteria): Promise<Announcement[]>;

    remove(id: AnnouncementId): Promise<void>;
}
