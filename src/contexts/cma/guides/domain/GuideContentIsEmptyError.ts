import { DomainError } from "../../../shared/domain/DomainError";

export class GuideContentIsEmptyError extends DomainError {
    readonly type = "guide_content_is_empty_error";
    readonly message = "Guide content is empty";
}
