import { EventBus } from "../../../../shared/domain/event/EventBus";
import { AnnouncementFinder } from "../../domain/AnnouncementFinder";
import { AnnouncementRepository } from "../../domain/AnnouncementRepository";

export class AnnouncementPublisher {
	private readonly finder: AnnouncementFinder;

	constructor(
		private readonly repository: AnnouncementRepository,
		private readonly eventBus: EventBus
	) {
		this.finder = new AnnouncementFinder(repository);
	}

	async remove(id: string): Promise<void> {
		const announcement = await this.finder.find(id);
		announcement.publish();
		await this.repository.save(announcement);
		await this.eventBus.publish(announcement.pullDomainEvents());
	}
}
