import { DomainError } from "../../../shared/domain/DomainError";

export class UserDoesNotExistError extends DomainError {
    readonly type = "user_does_not_exist_error";
    readonly message = `The user ${this.id} does not exist`;
    constructor(public readonly id: string) {
        super(`User ${id} does not exist`);
    }
}
