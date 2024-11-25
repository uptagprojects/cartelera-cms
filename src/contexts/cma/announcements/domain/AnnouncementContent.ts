import { StringValueObject } from "../../../shared/domain/StringValueObject";
import { AnnouncementContentIsEmptyError } from "./AnnouncementContentIsEmptyError";
import { AnnouncementContentTooLongError } from "./AnnouncementContentTooLongError";

export class AnnouncementContent extends StringValueObject {
	public static readonly maxLength = 320;

	constructor(value: string) {
		if (value.length === 0) {
			throw new AnnouncementContentIsEmptyError();
		}

		if (value.length > AnnouncementContent.maxLength) {
			throw new AnnouncementContentTooLongError(value, AnnouncementContent.maxLength);
		}

		super(value);
	}
}
