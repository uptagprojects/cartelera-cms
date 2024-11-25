import { DomainError } from "../../../shared/domain/DomainError";

export class GuideTitleIsEmptyError extends DomainError {
	readonly type = "guide_title_is_empty_error";
	readonly message = "Guide title is empty";
}
