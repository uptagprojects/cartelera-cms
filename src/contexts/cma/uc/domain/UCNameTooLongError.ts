import { DomainError } from "../../../shared/domain/DomainError";

export class UCNameTooLongError extends DomainError {
	readonly type = "uc_name_too_long_error";
	readonly message = `The UC name <<< ${this.name} >>> is longer than ${this.maxLength} characters.`;

	constructor(
		public readonly name: string,
		public readonly maxLength: number
	) {
		super();
	}
}
