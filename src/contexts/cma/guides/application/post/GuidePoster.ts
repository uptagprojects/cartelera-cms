import { EventBus } from "../../../../shared/domain/event/EventBus";
import { InvalidArgumentError } from "../../../../shared/domain/InvalidArgumentError";
import { InvalidIdentifierError } from "../../../../shared/domain/InvalidIdentifierError";
import { UCFinder } from "../../../uc/application/find/UCFinder";
import { UCDoesNotExistError } from "../../../uc/domain/UCDoesNotExistError";
import { UserDoesNotExistError } from "../../../users/domain/UserDoesNotExistError";
import { UserFinder } from "../../../users/domain/UserFinder";
import { Guide } from "../../domain/Guide";
import { GuideContentIsEmptyError } from "../../domain/GuideContentIsEmptyError";
import { GuideRepository } from "../../domain/GuideRepository";
import { GuideTitleIsEmptyError } from "../../domain/GuideTitleIsEmptyError";
import { GuideTitleTooLongError } from "../../domain/GuideTitleTooLongError";

export type GuidePosterErrors =
	| InvalidIdentifierError
	| InvalidArgumentError
	| GuideTitleIsEmptyError
	| GuideTitleTooLongError
	| GuideContentIsEmptyError
	| UserDoesNotExistError
	| UCDoesNotExistError;

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

		const guide = Guide.create(id, title, content, uc.id, user.getId());
		await this.repository.save(guide);
		await this.eventBus.publish(guide.pullDomainEvents());
	}
}
