import { DomainError } from "../../../shared/domain/DomainError";

export class UserIsNotActiveError extends DomainError {
    readonly type = "user_is_not_active_error";
    readonly message = `The user ${this.id} is not active`;

    constructor(public readonly id: string) {
        super();
    }
}
