import { EventBus } from "../../../../shared/domain/event/EventBus";
import { Announcement } from "../../domain/Announcement";
import { AnnouncementRepository } from "../../domain/AnnouncementRepository";

export class AnnouncementPoster {
	constructor(
		private readonly repository: AnnouncementRepository,
		private readonly eventBus: EventBus
	) {}

	async post(id: string, title: string, type: string, content: string): Promise<void> {
		const announcement = Announcement.create(id, title, type, content);
		await this.repository.save(announcement);
		await this.eventBus.publish(announcement.pullDomainEvents());
	}
}
