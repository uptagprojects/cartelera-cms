import { GuideContentUpdatedDomainEvent } from "../../../../../../src/contexts/cma/guides/domain/events/GuideContentUpdatedDomainEvent";
import { GuidePrimitives } from "../../../../../../src/contexts/cma/guides/domain/Guide";
import { GuideContentMother } from "../GuideContentMother";
import { GuideIdMother } from "../GuideIdMother";

export class GuideContentUpdatedDomainEventMother {
	static create(params?: Partial<GuidePrimitives>): GuideContentUpdatedDomainEvent {
		return new GuideContentUpdatedDomainEvent(
			GuideIdMother.create(params?.id).value,
			GuideContentMother.create(params?.content).value
		);
	}
}
