import { validate } from "uuid";

import { InvalidIdentifierError } from "./InvalidIdentifierError";
import { StringValueObject } from "./StringValueObject";

export class Identifier extends StringValueObject {
	constructor(value: string) {
		super(value);
		this.ensureIsValidIdentifier(value);
	}

	private ensureIsValidIdentifier(value: string) {
		if (!validate(value)) {
			throw new InvalidIdentifierError(value);
		}
	}
}
