import { EventBus } from "../../../../shared/domain/event/EventBus";
import { UCFinder } from "../../domain/UCFinder";
import { UCRepository } from "../../domain/UCRepository";

export class UCRenamer {
	private readonly finder: UCFinder;
	constructor(
		private readonly repository: UCRepository,
		private readonly eventBus: EventBus
	) {
		this.finder = new UCFinder(repository);
	}

	async rename(id: string, name: string): Promise<void> {
		const uc = await this.finder.find(id);
		uc.rename(name);
		await this.repository.save(uc);
		await this.eventBus.publish(uc.pullDomainEvents());
	}
}
