import { GuidePostedDomainEvent } from "../../../../../../src/contexts/cma/guides/domain/event/GuidePostedDomainEvent";
import { GuidePrimitives } from "../../../../../../src/contexts/cma/guides/domain/Guide";
import { UCIdMother } from "../../../uc/domain/UCIdMother";
import { UserIdMother } from "../../../users/domain/UserIdMother";
import { GuideContentMother } from "../GuideContentMother";
import { GuideIdMother } from "../GuideIdMother";
import { GuideStatusMother } from "../GuideStatusMother";
import { GuideTitleMother } from "../GuideTitleMother";

export class GuidePostedDomainEventMother {
	static create(params?: Partial<GuidePrimitives>): GuidePostedDomainEvent {
		return new GuidePostedDomainEvent(
			GuideIdMother.create(params?.id).value,
			GuideTitleMother.create(params?.title).value,
			GuideContentMother.create(params?.content).value,
			UCIdMother.create(params?.ucId).value,
			UserIdMother.create(params?.authorId).value,
			params?.status ?? GuideStatusMother.create()
		);
	}
}
