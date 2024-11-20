import { EventBus } from "../../../../shared/domain/event/EventBus";
import { Announcement } from "../../domain/Announcement";
import { AnnouncementIsArchivedError } from "../../domain/AnnouncementIsArchivedError";
import { AnnouncementRepository } from "../../domain/AnnouncementRepository";
import { AnnouncementFinder } from "../find/AnnouncementFinder";

export class AnnouncementTitleUpdater {
	private readonly finder: AnnouncementFinder;
	constructor(
		private readonly repository: AnnouncementRepository,
		private readonly eventBus: EventBus
	) {
		this.finder = new AnnouncementFinder(repository);
	}

	async update(id: string, title: string): Promise<void> {
		const announcement = await this.findAnnouncement(id);

		await this.ensureIsNotArchived(announcement);

		announcement.updateTitle(title);
		await this.repository.save(announcement);
		await this.eventBus.publish(announcement.pullDomainEvents());
	}

	private async findAnnouncement(id: string): Promise<Announcement> {
		return Announcement.fromPrimitives(await this.finder.find(id));
	}

	private async ensureIsNotArchived(announcement: Announcement): Promise<void> {
		if (announcement.isArchived()) {
			throw new AnnouncementIsArchivedError(announcement.getId());
		}
	}
}
