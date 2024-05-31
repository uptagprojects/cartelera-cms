import validate from "uuid-validate";
import { StringValueObject } from "./StringValueObject";
import { InvalidIdentifierError } from "./InvalidIdentifierError";

export class Identifier extends StringValueObject {
    constructor(value: string) {
        super(value);
        this.ensureIsValidIdentifier(value);
    }

    private ensureIsValidIdentifier(value: string) {
        if(!validate(value)) {
            throw new InvalidIdentifierError(value);
        }
    }
}