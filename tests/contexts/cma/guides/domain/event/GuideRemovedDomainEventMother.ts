import { GuideRemovedDomainEvent } from "../../../../../../src/contexts/cma/guides/domain/events/GuideRemovedDomainEvent";
import { GuidePrimitives } from "../../../../../../src/contexts/cma/guides/domain/Guide";
import { UCIdMother } from "../../../uc/domain/UCIdMother";
import { GuideIdMother } from "../GuideIdMother";

export class GuideRemovedDomainEventMother {
	static create(params?: Partial<GuidePrimitives>): GuideRemovedDomainEvent {
		return new GuideRemovedDomainEvent(
			GuideIdMother.create(params?.id).value,
			UCIdMother.create(params?.ucId).value
		);
	}
}
