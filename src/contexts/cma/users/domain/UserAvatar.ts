import { UrlValueObject } from "../../../shared/domain/UrlValueObject";

export class UserAvatar extends UrlValueObject {
	constructor(value: string) {
		super(new URL(value));
	}
}
