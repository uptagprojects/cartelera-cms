import { DomainError } from "../../../shared/domain/DomainError";

export class AnnouncementIsNotArchivedError extends DomainError {
	readonly type = "announcement_is_not_archived_error";
	readonly message = `The announcement ${this.id} is not archived`;

	constructor(public readonly id: string) {
		super();
	}
}
