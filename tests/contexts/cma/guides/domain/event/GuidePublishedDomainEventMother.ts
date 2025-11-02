import { GuidePublishedDomainEvent } from "../../../../../../src/contexts/cma/guides/domain/event/GuidePublishedDomainEvent";
import { GuidePrimitives } from "../../../../../../src/contexts/cma/guides/domain/Guide";
import { UCIdMother } from "../../../uc/domain/UCIdMother";
import { UserIdMother } from "../../../users/domain/UserIdMother";
import { GuideContentMother } from "../GuideContentMother";
import { GuideIdMother } from "../GuideIdMother";
import { GuideTitleMother } from "../GuideTitleMother";

export class GuidePublishedDomainEventMother {
	static create(params?: Partial<GuidePrimitives>): GuidePublishedDomainEvent {
		return new GuidePublishedDomainEvent(
			GuideIdMother.create(params?.id).value,
			GuideTitleMother.create(params?.title).value,
			GuideContentMother.create(params?.content).value,
			UCIdMother.create(params?.authorId).value,
			UserIdMother.create(params?.authorId).value
		);
	}
}
