import { AttachmentId } from "./AttachementId";
import { AttachmentURL } from "./AttachmentURL";
import { SourceId } from "./SourceId";

export interface AttachmentPrimitives {
	id: string;
	sourceId: string;
	url: string;
}
export class Attachment {
	readonly id: AttachmentId;
	readonly sourceId: SourceId;
	readonly url: AttachmentURL;

	constructor(id: AttachmentId, sourceId: SourceId, url: AttachmentURL) {
		this.id = id;
		this.sourceId = sourceId;
		this.url = url;
	}

	static fromPrimitives(plainData: AttachmentPrimitives): Attachment {
		return new Attachment(
			new AttachmentId(plainData.id),
			new SourceId(plainData.sourceId),
			new AttachmentURL(plainData.url)
		);
	}

	toPrimitives(): AttachmentPrimitives {
		return {
			id: this.id.value,
			sourceId: this.sourceId.value,
			url: this.url.value.toString()
		};
	}
}
