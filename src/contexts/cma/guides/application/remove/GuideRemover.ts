import { EventBus } from "../../../../shared/domain/event/EventBus";
import { GuideFinder } from "../../domain/GuideFinder";
import { GuideRepository } from "../../domain/GuideRepository";

export class GuideRemover {
	private readonly finder: GuideFinder;

	constructor(
		private readonly repository: GuideRepository,
		private readonly eventBus: EventBus
	) {
		this.finder = new GuideFinder(repository);
	}

	async remove(id: string): Promise<void> {
		const guide = await this.finder.find(id);
		await this.repository.remove(guide);
		await this.eventBus.publish(guide.pullDomainEvents());
	}
}
