import { GuideRestoredDomainEvent } from "../../../../../../src/contexts/cma/guides/domain/events/GuideRestoredDomainEvent";
import { GuidePrimitives } from "../../../../../../src/contexts/cma/guides/domain/Guide";
import { GuideIdMother } from "../GuideIdMother";

export class GuideRestoredDomainEventMother {
	static create(params?: Partial<GuidePrimitives>): GuideRestoredDomainEvent {
		return new GuideRestoredDomainEvent(GuideIdMother.create(params?.id).value);
	}
}
