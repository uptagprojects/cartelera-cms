import { StringValueObject } from "../../../shared/domain/StringValueObject";
import { AnnouncementTitleIsEmptyError } from "./AnnouncementTitleIsEmptyError";
import { AnnouncementTitleTooLongError } from "./AnnouncementTitleTooLongError";

export class AnnouncementTitle extends StringValueObject {
	public static readonly maxLength = 150;

	constructor(value: string) {
		if (value.length === 0) {
			throw new AnnouncementTitleIsEmptyError();
		}

		if (value.length > AnnouncementTitle.maxLength) {
			throw new AnnouncementTitleTooLongError(value, AnnouncementTitle.maxLength);
		}

		super(value);
	}
}
