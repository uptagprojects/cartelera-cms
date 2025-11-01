import { DomainError } from "../../../shared/domain/DomainError";

export class AnnouncementTitleIsEmptyError extends DomainError {
    readonly type = "announcement_title_is_empty_error";
    readonly message = "Announcement title is empty";
}
