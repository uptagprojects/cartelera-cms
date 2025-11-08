import { GuideRestoredDomainEvent } from "../../../../../../src/contexts/cma/guides/domain/event/GuideRestoredDomainEvent";
import { GuideIdMother } from "../GuideIdMother";

export class GuideRestoredDomainEventMother {
	static create(params?: { id?: string }): GuideRestoredDomainEvent {
		return new GuideRestoredDomainEvent(params?.id ?? GuideIdMother.create().value);
	}
}
