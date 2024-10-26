<<<<<<< HEAD
=======
import { Criteria } from "@/contexts/shared/domain/criteria/Criteria";
>>>>>>> feature/cda-domain
import { Announcement } from "./Announcement";
import { AnnouncementId } from "./AnnouncementId";

export interface AnnouncementRepository {

    search(id: AnnouncementId): Promise<Announcement | null>
<<<<<<< HEAD
=======
    
    matching(criteria: Criteria): Promise<Announcement[]>;
>>>>>>> feature/cda-domain

}