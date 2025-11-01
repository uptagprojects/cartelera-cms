import { DomainError } from "../../../shared/domain/DomainError";

export class AnnouncementIsArchivedError extends DomainError {
    readonly type = "announcement_is_archived_error";
    readonly message = `The announcement ${this.id} is archived`;

    constructor(public readonly id: string) {
        super();
    }
}
