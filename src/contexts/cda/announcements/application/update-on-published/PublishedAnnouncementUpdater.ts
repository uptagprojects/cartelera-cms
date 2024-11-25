import { Service } from "diod";

import { CdaAnnouncement } from "../../domain/CdaAnnouncement";
import { CdaAnnouncementId } from "../../domain/CdaAnnouncementId";
import { CdaAnnouncementRepository } from "../../domain/CdaAnnouncementRepository";

@Service()
export class PublishedAnnouncementUpdater {
	constructor(private readonly repository: CdaAnnouncementRepository) {}

	async update(id: string, title: string, content: string, type: string): Promise<void> {
		let announcement = await this.repository.search(new CdaAnnouncementId(id));

		if (!announcement) {
			announcement = CdaAnnouncement.create(id, title, content, type);
		} else {
			announcement.updateTitle(title);
			announcement.updateContent(content);
		}

		await this.repository.save(announcement);
	}
}
