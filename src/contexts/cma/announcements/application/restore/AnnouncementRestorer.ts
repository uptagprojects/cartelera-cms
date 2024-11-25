import { EventBus } from "../../../../shared/domain/event/EventBus";
import { Announcement } from "../../domain/Announcement";
import { AnnouncementIsNotArchivedError } from "../../domain/AnnouncementIsNotArchivedError";
import { AnnouncementRepository } from "../../domain/AnnouncementRepository";
import { AnnouncementFinder } from "../find/AnnouncementFinder";

export class AnnouncementRestorer {
	private readonly finder: AnnouncementFinder;

	constructor(
		private readonly repository: AnnouncementRepository,
		private readonly eventBus: EventBus
	) {
		this.finder = new AnnouncementFinder(repository);
	}

	async restore(id: string): Promise<void> {
		const announcement = await this.findAnnouncement(id);
		await this.ensureIsArchived(announcement);
		announcement.restore();
		await this.repository.save(announcement);
		await this.eventBus.publish(announcement.pullDomainEvents());
	}

	private async findAnnouncement(id: string): Promise<Announcement> {
		return Announcement.fromPrimitives(await this.finder.find(id));
	}

	private async ensureIsArchived(announcement: Announcement): Promise<void> {
		if (!announcement.isArchived()) {
			throw new AnnouncementIsNotArchivedError(announcement.getId());
		}
	}
}
