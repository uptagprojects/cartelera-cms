import { AnnouncementContent } from "./AnnouncementContent";
import { AnnouncementId } from "./AnnouncementId";
import { AnnouncementTitle } from "./AnnouncementTitle";
import { AnnouncementType } from "./AnnouncementType";

export interface AnnouncementPrimitives {
	id: string;
	title: string;
	content: string;
	type: string;
}

export class Announcement {
	constructor(
		public readonly id: AnnouncementId,
		private title: AnnouncementTitle,
		private content: AnnouncementContent,
		private readonly type: AnnouncementType
	) {}

	static create(id: string, title: string, content: string, type: string): Announcement {
		return new Announcement(
			new AnnouncementId(id),
			new AnnouncementTitle(title),
			new AnnouncementContent(content),
			type as AnnouncementType
		);
	}

	static fromPrimitives(plainData: AnnouncementPrimitives): Announcement {
		return new Announcement(
			new AnnouncementId(plainData.id),
			new AnnouncementTitle(plainData.title),
			new AnnouncementContent(plainData.content),
			plainData.type as AnnouncementType
		);
	}

	toPrimitives(): AnnouncementPrimitives {
		return {
			id: this.id.value,
			title: this.title.value,
			content: this.content.value,
			type: this.type
		};
	}

	updateTitle(title: string): void {
		this.title = new AnnouncementTitle(title);
	}

	updateContent(content: string): void {
		this.content = new AnnouncementContent(content);
	}
}
