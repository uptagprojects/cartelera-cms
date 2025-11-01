import { GuidePublishedDomainEvent } from "../../../../../../src/contexts/cma/guides/domain/event/GuidePublishedDomainEvent";
import { GuidePrimitives } from "../../../../../../src/contexts/cma/guides/domain/Guide";
import { UCIdMother } from "../../../uc/domain/UCIdMother";
import { UserIdMother } from "../../../users/domain/UserIdMother";
import { GuideContentMother } from "../GuideContentMother";
import { GuideIdMother } from "../GuideIdMother";
import { GuideTitleMother } from "../GuideTitleMother";

export class GuidePublishedDomainEventMother {
	static create(params?: Partial<GuidePrimitives>): GuidePublishedDomainEvent {
		const primitives: GuidePrimitives = {
			id: GuideIdMother.create().value,
			title: GuideTitleMother.create().value,
			content: GuideContentMother.create().value,
			ucId: UCIdMother.create().value,
			authorId: UserIdMother.create().value,
			status: params?.status ?? "PUBLISHED",
			...params
		};

		return new GuidePublishedDomainEvent(
			primitives.id,
			primitives.title,
			primitives.content,
			primitives.ucId,
			primitives.authorId
		);
	}
}
