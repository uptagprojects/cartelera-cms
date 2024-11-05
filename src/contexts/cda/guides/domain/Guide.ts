import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { UCName } from "../../uc/domain/UCName";
import { GuideAttachment } from "./GuideAttachment";
import { GuideContent } from "./GuideContent";
import { GuideContentWrapped } from "./GuideContentWrapped";
import { GuideId } from "./GuideId";
import { GuidePublishDate } from "./GuidePublishDate";
import { GuideTitle } from "./GuideTitle";
import { Professor, ProfessorPrimitives } from "./Professor/Professor";

export interface GuidePrimitives {
	id: string;
	title: string;
	content: string;
	contentWrapped: string;
	area: string;
	professor: ProfessorPrimitives;
	publishDate: string;
	attachments: string[];
}

export class Guide extends AggregateRoot {
	constructor(
		private readonly id: GuideId,
		private title: GuideTitle,
		private content: GuideContent,
		private contentWrapped: GuideContentWrapped,
		private area: UCName,
		private readonly professor: Professor,
		private readonly publishDate: GuidePublishDate,
		private attachments: GuideAttachment[]
	) {
		super();
	}

	static create(
		id: string,
		title: string,
		content: string,
		contentWrapped: string,
		area: string,
		professor: ProfessorPrimitives,
		publishDate: string,
		attachments: string[]
	): Guide {
		const guide = new Guide(
			new GuideId(id),
			new GuideTitle(title),
			new GuideContent(content),
			new GuideContentWrapped(contentWrapped),
			new UCName(area),
			Professor.fromPrimitives(professor),
			new GuidePublishDate(publishDate),
			attachments.map(v => new GuideAttachment(v))
		);


		return guide;
	}

	static fromPrimitives(plainData: GuidePrimitives): Guide {
		return new Guide(
			new GuideId(plainData.id),
			new GuideTitle(plainData.title),
			new GuideContent(plainData.content),
			new GuideContentWrapped(plainData.contentWrapped),
			new UCName(plainData.area),
			Professor.fromPrimitives(plainData.professor),
			new GuidePublishDate(plainData.publishDate),
			plainData.attachments.map(v => new GuideAttachment(v))
		);
	}

	toPrimitives(): GuidePrimitives {
		return {
			id: this.id.value,
			title: this.title.value,
			content: this.content.value,
			contentWrapped: this.contentWrapped.value,
			area: this.area.value,
			professor: this.professor.toPrimitives(),
			publishDate: this.publishDate.value.toString(),
			attachments: this.attachments.map(v => v.value)
		};
	}

	getId(): GuideId {
		return this.id;
	}

	updateTitle(title: string): void {
		this.title = new GuideTitle(title);
	}

	updateContent(content: string): void {
		this.content = new GuideContent(content);
	}

	updateContentWrapped(contentWrapped: string): void {
		this.contentWrapped = new GuideContentWrapped(contentWrapped);
	}

	updateArea(area: string): void {
		this.area = new UCName(area);
	}

	updateAttachments(attachments: string[]): void {
		this.attachments = attachments.map(v => new GuideAttachment(v));
	}
}
