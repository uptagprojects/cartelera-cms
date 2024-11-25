import { DomainError } from "../../../shared/domain/DomainError";

export class UCDoesNotExistError extends DomainError {
	readonly type = "uc_does_not_exist_error";
	readonly message = `The uc ${this.id} does not exist`;
	constructor(public readonly id: string) {
		super(`UC ${id} does not exist`);
	}
}
