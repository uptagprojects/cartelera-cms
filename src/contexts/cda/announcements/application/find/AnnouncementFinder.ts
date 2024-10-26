import { Announcement } from "../../domain/Announcement";
import { AnnouncementDoesNotExists } from "../../domain/AnnouncementDoesNotExists";
import { AnnouncementId } from "../../domain/AnnouncementId";
import { AnnouncementRepository } from "../../domain/AnnouncementRepository";

export class AoonucementFinder {
	constructor(private readonly repository: AnnouncementRepository) {}
	async find(id: string): Promise<Announcement> {
		const announcement = await this.repository.search(new AnnouncementId(id));
		if (!announcement) {
			throw new AnnouncementDoesNotExists(id);
		}

		return announcement;
	}
}
