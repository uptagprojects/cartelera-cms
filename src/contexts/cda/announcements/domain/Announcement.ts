import { AnnouncementActive } from "./AnnouncementActive";
import { AnnouncementContent } from "./AnnouncementContent";
import { AnnouncementId } from "./AnnouncementId";
import { AnnouncementPublishDate } from "./AnnouncementPublishDate";
import { AnnouncementTitle } from "./AnnouncementTitle";
import { AnnouncementType } from "./AnnouncementType";

export interface AnnouncementPrimitives {
	id: string;
	title: string;
	content: string;
	publishDate: string;
	type: string;
	active: boolean;
}

export class Announcement {
	readonly id: AnnouncementId;
	readonly title: AnnouncementTitle;
	readonly content: AnnouncementContent;
	readonly publishDate: AnnouncementPublishDate;
	readonly type: AnnouncementType;
	readonly active: AnnouncementActive;

	constructor(
		id: AnnouncementId,
		title: AnnouncementTitle,
		content: AnnouncementContent,
		publishDate: AnnouncementPublishDate,
		type: AnnouncementType,
		active: AnnouncementActive
	) {
		this.id = id;
		this.title = title;
		this.content = content;
		this.publishDate = publishDate;
		this.type = type;
		this.active = active;
	}

	static fromPrimitives(plainData: AnnouncementPrimitives): Announcement {
		return new Announcement(
			new AnnouncementId(plainData.id),
			new AnnouncementTitle(plainData.title),
			new AnnouncementContent(plainData.content),
			new AnnouncementPublishDate(plainData.publishDate),
			plainData.type as AnnouncementType,
			new AnnouncementActive(plainData.active)
		);
	}

	toPrimitives(): AnnouncementPrimitives {
		return {
			id: this.id.value,
			title: this.title.value,
			content: this.content.value,
			publishDate: this.publishDate.value.toString(),
			type: this.type,
			active: this.active.value
		};
	}
}
