import { EventBus } from "../../../../shared/domain/event/EventBus";
import { InvalidArgumentError } from "../../../../shared/domain/InvalidArgumentError";
import { InvalidIdentifierError } from "../../../../shared/domain/InvalidIdentifierError";
import { Announcement } from "../../domain/Announcement";
import { AnnouncementRepository } from "../../domain/AnnouncementRepository";

export type AnnouncementPosterErrors = InvalidIdentifierError | InvalidArgumentError;

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
