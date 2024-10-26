import { Criteria } from "@/contexts/shared/domain/criteria/Criteria";
import { Announcement } from "./Announcement";
import { AnnouncementId } from "./AnnouncementId";
export interface AnnouncementRepository {

    search(id: AnnouncementId): Promise<Announcement | null>

    matching(criteria: Criteria): Promise<Announcement[]>;

}