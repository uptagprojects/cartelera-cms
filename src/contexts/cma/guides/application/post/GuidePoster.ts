import { EventBus } from "../../../../shared/domain/event/EventBus";
import { UCFinder } from "../../../uc/domain/UCFinder";
import { UserFinder } from "../../../users/domain/UserFinder";
import { Guide } from "../../domain/Guide";
import { GuideRepository } from "../../domain/GuideRepository";

export class GuidePoster {
	constructor(
		private readonly repository: GuideRepository,
		private readonly userFinder: UserFinder,
		private readonly ucFinder: UCFinder,
		private readonly eventBus: EventBus
	) {}

	async post(
		id: string,
		title: string,
		content: string,
		areaId: string,
		authorId: string
	): Promise<void> {
		const user = await this.userFinder.find(authorId);
		const uc = await this.ucFinder.find(areaId);

		const guide = Guide.create(id, title, content, uc.getId().value, user.getId().value);
		await this.repository.save(guide);
		await this.eventBus.publish(guide.pullDomainEvents());
	}
}
