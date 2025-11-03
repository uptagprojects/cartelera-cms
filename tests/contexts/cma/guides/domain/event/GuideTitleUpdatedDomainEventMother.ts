import { GuideTitleUpdatedDomainEvent } from "../../../../../../src/contexts/cma/guides/domain/events/GuideTitleUpdatedDomainEvent";
import { GuidePrimitives } from "../../../../../../src/contexts/cma/guides/domain/Guide";
import { GuideIdMother } from "../GuideIdMother";
import { GuideTitleMother } from "../GuideTitleMother";

export class GuideTitleUpdatedDomainEventMother {
	static create(params?: Partial<GuidePrimitives>): GuideTitleUpdatedDomainEvent {
		return new GuideTitleUpdatedDomainEvent(
			GuideIdMother.create(params?.id).value,
			GuideTitleMother.create(params?.title).value
		);
	}
}
