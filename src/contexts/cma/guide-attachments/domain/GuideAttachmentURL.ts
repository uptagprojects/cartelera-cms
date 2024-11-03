import { UrlValueObject } from "../../../shared/domain/UrlValueObject";

export class GuideAttachmentURL extends UrlValueObject {
	constructor(value: string) {
		super(new URL(value));
	}
}
