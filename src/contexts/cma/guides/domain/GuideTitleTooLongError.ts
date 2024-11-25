import { DomainError } from "../../../shared/domain/DomainError";

export class GuideTitleTooLongError extends DomainError {
	readonly type = "guide_title_too_long_error";
	readonly message = `The guide title <<< ${this.title} >>> is longer than ${this.maxLength} characters.`;

	constructor(
		public readonly title: string,
		public readonly maxLength: number
	) {
		super();
	}
}
