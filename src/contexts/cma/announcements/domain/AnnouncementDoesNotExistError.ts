import { DomainError } from "../../../shared/domain/DomainError";

export class AnnouncementDoesNotExistError extends DomainError {
    readonly type = "announcement_does_not_exist_error";
    readonly message = `The announcement ${this.id} does not exist`;
    constructor(public readonly id: string) {
        super(`Announcement ${id} does not exist`);
    }
}
