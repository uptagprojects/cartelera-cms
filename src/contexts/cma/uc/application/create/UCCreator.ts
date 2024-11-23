import { EventBus } from "../../../../shared/domain/event/EventBus";
import { InvalidIdentifierError } from "../../../../shared/domain/InvalidIdentifierError";
import { UC } from "../../domain/UC";
import { UCNameIsEmptyError } from "../../domain/UCNameIsEmptyError";
import { UCNameTooLongError } from "../../domain/UCNameTooLongError";
import { UCRepository } from "../../domain/UCRepository";

export type UCCreatorErrors = InvalidIdentifierError | UCNameIsEmptyError | UCNameTooLongError;
export class UCCreator {
	constructor(
		private readonly repository: UCRepository,
		private readonly eventBus: EventBus
	) {}

	async create(id: string, name: string): Promise<void> {
		const uc = UC.create(id, name);
		await this.repository.save(uc);
		await this.eventBus.publish(uc.pullDomainEvents());
	}
}
