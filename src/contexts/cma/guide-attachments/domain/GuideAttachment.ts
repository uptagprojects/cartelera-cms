import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { GuideId } from "../../guides/domain/GuideId";
import { GuideAttachmentUploadedDomainEvent } from "./event/GuideAttachmentUploadedDomainEvent";
import { GuideAttachmentId } from "./GuideAttachmentId";
import { GuideAttachmentURL } from "./GuideAttachmentURL";

export interface GuideAttachmentPrimitives {
	id: string;
	guideId: string;
	url: string;
}

export class GuideAttachment extends AggregateRoot {
	constructor(
		private readonly id: GuideAttachmentId,
		private readonly guideId: GuideId,
		private readonly url: GuideAttachmentURL
	) {
		super();
	}

	static create(id: string, guideId: string, url: string): GuideAttachment {
		const attachment = new GuideAttachment(
			new GuideAttachmentId(id),
			new GuideId(guideId),
			new GuideAttachmentURL(url)
		);

		attachment.record(new GuideAttachmentUploadedDomainEvent(id, guideId, url));

		return attachment;
	}

	static fromPrimitives(primitives: GuideAttachmentPrimitives): GuideAttachment {
		return new GuideAttachment(
			new GuideAttachmentId(primitives.id),
			new GuideId(primitives.guideId),
			new GuideAttachmentURL(primitives.url)
		);
	}

	toPrimitives(): GuideAttachmentPrimitives {
		return {
			id: this.id.value,
			guideId: this.guideId.value,
			url: this.url.value.toString()
		};
	}
}
