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
	readonly id: AnnouncementId;
	readonly title: AnnouncementTitle;
	readonly content: AnnouncementContent;
	readonly type: AnnouncementType;

	constructor(
		id: AnnouncementId,
		title: AnnouncementTitle,
		content: AnnouncementContent,
		type: AnnouncementType,
	) {
		this.id = id;
		this.title = title;
		this.content = content;
		this.type = type;
	}

	static fromPrimitives(plainData: AnnouncementPrimitives): Announcement {
		return new Announcement(
			new AnnouncementId(plainData.id),
			new AnnouncementTitle(plainData.title),
			new AnnouncementContent(plainData.content),
			plainData.type as AnnouncementType,
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
}
