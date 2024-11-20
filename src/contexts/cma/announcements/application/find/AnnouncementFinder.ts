import { AnnouncementPrimitives } from "../../domain/Announcement";
import { AnnouncementDoesNotExistError } from "../../domain/AnnouncementDoesNotExistError";
import { AnnouncementId } from "../../domain/AnnouncementId";
import { AnnouncementRepository } from "../../domain/AnnouncementRepository";

export class AnnouncementFinder {
	constructor(private readonly repository: AnnouncementRepository) {}

	async find(id: string): Promise<AnnouncementPrimitives> {
		const announcement = await this.repository.search(new AnnouncementId(id));
		if (!announcement) {
			throw new AnnouncementDoesNotExistError(id);
		}

		return announcement.toPrimitives();
	}
}
