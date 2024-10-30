import { Attachment, AttachmentPrimitives } from "../../attachments/domain/Attachment";
import { UCName } from "../../uc/domain/UCName";
import { GuideContent } from "./GuideContent";
import { GuideId } from "./GuideId";
import { GuidePublishDate } from "./GuidePublishDate";
import { GuideTitle } from "./GuideTitle";
import { Professor, ProfessorPrimitives } from "./Professor/Professor";

export interface GuidePrimitives {
	id: string;
	title: string;
	content: string;
	area: string;
	professor: ProfessorPrimitives;
	publishDate: string;
	attachments: AttachmentPrimitives[];
}

export class Guide {
	readonly id: GuideId;
	readonly title: GuideTitle;
	readonly content: GuideContent;
	readonly area: UCName;
	readonly professor: Professor;
	readonly publishDate: GuidePublishDate;
	readonly attachements: Attachment[];

	constructor(
		id: GuideId,
		title: GuideTitle,
		content: GuideContent,
		area: UCName,
		professor: Professor,
		publishDate: GuidePublishDate,
		attachements: Attachment[]
	) {
		this.id = id;
		this.title = title;
		this.content = content;
		this.area = area;
		this.professor = professor;
		this.publishDate = publishDate;
		this.attachements = attachements;
	}

	static fromPrimitives(plainData: GuidePrimitives): Guide {
		return new Guide(
			new GuideId(plainData.id),
			new GuideTitle(plainData.title),
			new GuideContent(plainData.content),
			new UCName(plainData.area),
			Professor.fromPrimitives(plainData.professor),
			new GuidePublishDate(plainData.publishDate),
			plainData.attachments.map(v => Attachment.fromPrimitives(v))
		);
	}

	toPrimitives(): GuidePrimitives {
		return {
			id: this.id.value,
			title: this.title.value,
			content: this.content.value,
			area: this.area.value,
			professor: this.professor.toPrimitives(),
			publishDate: this.publishDate.value.toString(),
			attachments: this.attachements.map(v => v.toPrimitives())
		};
	}
}
