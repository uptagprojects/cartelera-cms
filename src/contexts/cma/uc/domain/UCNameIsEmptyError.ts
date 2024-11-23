import { DomainError } from "../../../shared/domain/DomainError";

export class UCNameIsEmptyError extends DomainError {
	readonly type = "uc_name_is_empty_error";
	readonly message = "UC name is empty";
}
