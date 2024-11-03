import { EventBus } from "../../../../shared/domain/event/EventBus";
import { AnnouncementFinder } from "../../domain/AnnouncementFinder";
import { AnnouncementRepository } from "../../domain/AnnouncementRepository";

export class AnnouncementActivator {
	private readonly finder: AnnouncementFinder;
	constructor(
		private readonly repository: AnnouncementRepository,
		private readonly eventBus: EventBus
	) {
		this.finder = new AnnouncementFinder(repository);
	}

	async update(id: string): Promise<void> {
		const announcement = await this.finder.find(id);
		announcement.activateAnnouncement();
		await this.repository.save(announcement);
		await this.eventBus.publish(announcement.pullDomainEvents());
	}
}
