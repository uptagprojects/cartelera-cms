import { EventBus } from "../../../../shared/domain/event/EventBus";
import { UCFinder } from "../../domain/UCFinder";
import { UCRepository } from "../../domain/UCRepository";

export class UCRemover {
	private readonly finder: UCFinder;

	constructor(
		private readonly repository: UCRepository,
		private readonly eventBus: EventBus
	) {
		this.finder = new UCFinder(repository);
	}

	async remove(id: string): Promise<void> {
		const uc = await this.finder.find(id);
		await this.repository.remove(uc);
		await this.eventBus.publish(uc.pullDomainEvents());
	}
}
