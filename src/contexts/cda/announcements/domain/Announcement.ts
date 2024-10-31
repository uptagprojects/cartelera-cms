import { Attachment, AttachmentPrimitives } from "../../attachments/domain/Attachment";
import { AnnouncementContent } from "./AnnouncementContent";
import { AnnouncementId } from "./AnnouncementId";
import { AnnouncementPublishDate } from "./AnnouncementPublishDate";
import { AnnouncementTitle } from "./AnnouncementTitle";

export interface AnnouncementPrimitives {
	id: string;
	title: string;
	content: string;
	publishDate: string;
	attachments: AttachmentPrimitives[];
}

export class Announcement {
	readonly id: AnnouncementId;
	readonly title: AnnouncementTitle;
	readonly content: AnnouncementContent;
	readonly publishDate: AnnouncementPublishDate;
	readonly attachements: Attachment[];

	constructor(
		id: AnnouncementId,
		title: AnnouncementTitle,
		content: AnnouncementContent,
		publishDate: AnnouncementPublishDate,
		attachements: Attachment[]
	) {
		this.id = id;
		this.title = title;
		this.content = content;
		this.publishDate = publishDate;
		this.attachements = attachements;
	}

	static fromPrimitives(plainData: AnnouncementPrimitives): Announcement {
		return new Announcement(
			new AnnouncementId(plainData.id),
			new AnnouncementTitle(plainData.title),
			new AnnouncementContent(plainData.content),
			new AnnouncementPublishDate(plainData.publishDate),
			plainData.attachments.map(v => Attachment.fromPrimitives(v))
		);
	}

	toPrimitives(): AnnouncementPrimitives {
		return {
			id: this.id.value,
			title: this.title.value,
			content: this.content.value,
			publishDate: this.publishDate.value.toISOString(),
			attachments: this.attachements.map(v => v.toPrimitives())
		};
	}
}
