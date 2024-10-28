import { hashSync } from "bcrypt";

import { StringValueObject } from "../../../shared/domain/StringValueObject";
import { AuthPasswordDoesNotMeetLengthRequirements } from "./AuthPasswordDoesNotMeetLengthRequirements";

export const HASH_ROUNDS = 10;
export class AuthPassword extends StringValueObject {
	constructor(value: string) {
		super(hashSync(value, HASH_ROUNDS));
		this.ensureMinimalLength(value);
	}

	private ensureMinimalLength(value: string): void {
		if (value.length > 16) {
			throw new AuthPasswordDoesNotMeetLengthRequirements(
				`The Password <${value}> must be at least 16 characters`
			);
		}
	}
}
