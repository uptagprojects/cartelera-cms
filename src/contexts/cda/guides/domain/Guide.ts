import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { Attachment, AttachmentPrimitives } from "../../attachments/domain/Attachment";
import { UCName } from "../../uc/domain/UCName";
import { CdaGuidePostedDomainEvent } from "./event/CdaGuidePostedDomainEvent";
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
	attachments: AttachmentPrimitives[];
}

export class Guide extends AggregateRoot {
	constructor(
		private readonly id: GuideId,
		private readonly title: GuideTitle,
		private readonly content: GuideContent,
		private readonly contentWrapped: GuideContentWrapped,
		private readonly area: UCName,
		private readonly professor: Professor,
		private readonly publishDate: GuidePublishDate,
		private readonly attachments: Attachment[]
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
		attachments: AttachmentPrimitives[]
	): Guide {
		const guide = new Guide(
			new GuideId(id),
			new GuideTitle(title),
			new GuideContent(content),
			new GuideContentWrapped(contentWrapped),
			new UCName(area),
			Professor.fromPrimitives(professor),
			new GuidePublishDate(publishDate),
			attachments.map(v => Attachment.fromPrimitives(v))
		);

		guide.record(
			new CdaGuidePostedDomainEvent(
				id,
				title,
				content,
				contentWrapped,
				area,
				professor,
				publishDate,
				attachments
			)
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
			plainData.attachments.map(v => Attachment.fromPrimitives(v))
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
			attachments: this.attachments.map(v => v.toPrimitives())
		};
	}
}
