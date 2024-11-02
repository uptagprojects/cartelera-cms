import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { AnnouncementActive } from "./AnnouncementActive";
import { AnnouncementContent } from "./AnnouncementContent";
import { AnnouncementId } from "./AnnouncementId";
import { AnnouncementPublishDate } from "./AnnouncementPublishDate";
import { AnnouncementTitle } from "./AnnouncementTitle";
import { AnnouncementType } from "./AnnouncementType";
import { AnnouncementContentUpdatedDomainEvent } from "./event/AnnouncementContentUpdatedDomainEvent";
import { AnnouncementDeactivatedDomainEvent } from "./event/AnnouncementDeactivatedDomainEvent";
import { AnnouncementPublishedDomainEvent } from "./event/AnnouncementPublishedDomainEvent";
import { AnnouncementTitleUpdatedDomainEvent } from "./event/AnnouncementTitleUpdatedDomainEvent";

export interface AnnouncementPrimitives {
	id: string;
	title: string;
	content: string;
	publishDate: string;
	type: string;
	active: boolean;
}


export class Announcement extends AggregateRoot {
	
	constructor(
		private id: AnnouncementId,
		private title: AnnouncementTitle,
		private content: AnnouncementContent,
		private publishDate: AnnouncementPublishDate,
		private type: AnnouncementType,
		private active: AnnouncementActive,
	) {
		super()
	}

	static create(id: string, title: string, content: string, publishDate: string, type: string, active: boolean): Announcement {

		const announcement = new Announcement(
			new AnnouncementId(id),
			new AnnouncementTitle(title),
			new AnnouncementContent(content),
			new AnnouncementPublishDate(publishDate),
			type as AnnouncementType,
			new AnnouncementActive(active),
		);

		announcement.record(new AnnouncementPublishedDomainEvent(id, title, content, publishDate, type, active));
		return announcement;
	}

	static fromPrimitives(plainData: AnnouncementPrimitives): Announcement {
		return new Announcement(
			new AnnouncementId(plainData.id),
			new AnnouncementTitle(plainData.title),
			new AnnouncementContent(plainData.content),
			new AnnouncementPublishDate(plainData.publishDate),
			plainData.type as AnnouncementType,
			new AnnouncementActive(plainData.active),
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

	updateTitle(title: string): void {
		this.title = new AnnouncementTitle(title);
		this.record(new AnnouncementTitleUpdatedDomainEvent(this.id.value, title));
	}

	updateContent(content: string): void {
		this.content = new AnnouncementContent(content);
		this.record(new AnnouncementContentUpdatedDomainEvent(this.id.value, content));
	}

	activateAnnouncement(): void {
		this.active = new AnnouncementActive(true);
		this.record(new AnnouncementDeactivatedDomainEvent(this.id.value, true));
	}

	deactivateAnnouncement(): void {
		this.active = new AnnouncementActive(false);
		this.record(new AnnouncementDeactivatedDomainEvent(this.id.value, false));
	}

}
