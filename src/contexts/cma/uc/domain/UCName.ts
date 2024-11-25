import { StringValueObject } from "../../../shared/domain/StringValueObject";
import { UCNameIsEmptyError } from "./UCNameIsEmptyError";
import { UCNameTooLongError } from "./UCNameTooLongError";

export class UCName extends StringValueObject {
	public static readonly maxLength = 150;

	constructor(value: string) {
		if (value.length === 0) {
			throw new UCNameIsEmptyError();
		}

		if (value.length > UCName.maxLength) {
			throw new UCNameTooLongError(value, UCName.maxLength);
		}

		super(value);
	}
}
