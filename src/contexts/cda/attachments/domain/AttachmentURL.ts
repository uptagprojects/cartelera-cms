import { UrlValueObject } from "../../../shared/domain/UrlValueObject";

export class AttachmentURL extends UrlValueObject {
	constructor(value: string) {
		super(new URL(value));
	}
}
