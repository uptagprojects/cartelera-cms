import { Criteria } from "../../../shared/domain/criteria/Criteria";
import { Announcement } from "./Announcement";
import { AnnouncementId } from "./AnnouncementId";

export abstract class AnnouncementRepository {
	abstract save(Announcement: Announcement): Promise<void>;
	
	abstract search(id: AnnouncementId): Promise<Announcement | null>;

	abstract searchAll(): Promise<Announcement[]>;

	abstract remove(Announcement: Announcement): Promise<void>;
}
