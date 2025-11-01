import { DomainError } from "./DomainError";

export class InvalidIdentifierError extends DomainError {
    readonly type = "invalid_identifier_error";
    readonly message = `${this.id} is not a valid identifier`;

    constructor(public readonly id: string) {
        super();
    }
}
