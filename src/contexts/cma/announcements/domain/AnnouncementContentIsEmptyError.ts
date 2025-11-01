import { DomainError } from "../../../shared/domain/DomainError";

export class AnnouncementContentIsEmptyError extends DomainError {
    readonly type = "announcement_content_is_empty_error";
    readonly message = "Announcement content is empty";
}
