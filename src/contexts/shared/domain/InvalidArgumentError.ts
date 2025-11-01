import { DomainError } from "./DomainError";

export class InvalidArgumentError extends DomainError {
    readonly type = "invalid_argument_error";
    readonly message = "Invalid argument";

    constructor(public readonly values: string) {
        super();
    }
}
