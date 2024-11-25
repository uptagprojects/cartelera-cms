import { StringValueObject } from "../../../shared/domain/StringValueObject";
import { UserEmailIsNotValidError } from "./UserEmailIsNotValidError";

export class UserEmail extends StringValueObject {
	constructor(value: string) {
		super(value);
		this.ensureIsValidEmail(value);
	}

	private ensureIsValidEmail(value: string): void {
		if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value)) {
			throw new UserEmailIsNotValidError(value);
		}
	}
}
