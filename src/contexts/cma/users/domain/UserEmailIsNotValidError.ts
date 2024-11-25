import { DomainError } from "../../../shared/domain/DomainError";

export class UserEmailIsNotValidError extends DomainError {
	readonly type = "user_email_is_not_valid_error";
	readonly message = `The email ${this.email} is not valid`;

	constructor(public readonly email: string) {
		super();
	}
}
