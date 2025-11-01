import { DomainError } from "../../../shared/domain/DomainError";

export class AnnouncementTitleTooLongError extends DomainError {
    readonly type = "announcement_title_too_long_error";
    readonly message = `The announcement title <<< ${this.title} >>> is longer than ${this.maxLength} characters.`;

    constructor(
        public readonly title: string,
        public readonly maxLength: number
    ) {
        super();
    }
}
