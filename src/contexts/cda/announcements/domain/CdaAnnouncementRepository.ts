import { CdaAnnouncement } from "./CdaAnnouncement";
import { CdaAnnouncementId } from "./CdaAnnouncementId";

export abstract class CdaAnnouncementRepository {
	abstract save(announcement: CdaAnnouncement): Promise<void>;

	abstract search(id: CdaAnnouncementId): Promise<CdaAnnouncement | null>;

	abstract searchAll(): Promise<CdaAnnouncement[]>;

	abstract remove(announcement: CdaAnnouncement): Promise<void>;
}
