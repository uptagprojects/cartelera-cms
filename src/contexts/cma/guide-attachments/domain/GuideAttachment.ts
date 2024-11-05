import { AggregateRoot } from "../../../shared/domain/AggregateRoot";
import { GuideId } from "../../guides/domain/GuideId";
import { GuideAttachmentUploadedDomainEvent } from "./event/GuideAttachmentUploadedDomainEvent";
import { GuideAttachmentId } from "./GuideAttachmentId";
import { GuideAttachmentMIMEType } from "./GuideAttachmentMIMEType";
import { GuideAttachmentName } from "./GuideAttachmentName";
import { GuideAttachmentSize } from "./GuideAttachmentSize";
import { GuideAttachmentStoragePath } from "./GuideAttachmentStoragePath";
import { GuideAttachmentURL } from "./GuideAttachmentURL";

export interface GuideAttachmentPrimitives {
	id: string;
	name: string;
	guideId: string;
	url: string;
	size: number;
	mimeType: string;
	storagePath: string;
}

export class GuideAttachment extends AggregateRoot {
	constructor(
		private readonly id: GuideAttachmentId,
		private readonly name: GuideAttachmentName,
		private readonly guideId: GuideId,
		private readonly url: GuideAttachmentURL,
		private readonly size: GuideAttachmentSize,
		private readonly mimeType: GuideAttachmentMIMEType,
		private readonly storagePath: GuideAttachmentStoragePath
	) {
		super();
	}

	static create(
		id: string,
		name: string,
		guideId: string,
		url: string,
		size: number,
		mimeType: string,
		storagePath: string
	): GuideAttachment {
		const attachment = new GuideAttachment(
			new GuideAttachmentId(id),
			new GuideAttachmentName(name),
			new GuideId(guideId),
			new GuideAttachmentURL(url),
			new GuideAttachmentSize(size),
			new GuideAttachmentMIMEType(mimeType),
			new GuideAttachmentStoragePath(storagePath)
		);

		attachment.record(
			new GuideAttachmentUploadedDomainEvent(
				id,
				name,
				guideId,
				url,
				size,
				mimeType,
				storagePath
			)
		);

		return attachment;
	}

	static fromPrimitives(primitives: GuideAttachmentPrimitives): GuideAttachment {
		return new GuideAttachment(
			new GuideAttachmentId(primitives.id),
			new GuideAttachmentName(primitives.name),
			new GuideId(primitives.guideId),
			new GuideAttachmentURL(primitives.url),
			new GuideAttachmentSize(primitives.size),
			new GuideAttachmentMIMEType(primitives.mimeType),
			new GuideAttachmentStoragePath(primitives.storagePath)
		);
	}

	toPrimitives(): GuideAttachmentPrimitives {
		return {
			id: this.id.value,
			name: this.name.value,
			guideId: this.guideId.value,
			url: this.url.value.toString(),
			size: this.size.value,
			mimeType: this.mimeType.value,
			storagePath: this.storagePath.value
		};
	}
}
