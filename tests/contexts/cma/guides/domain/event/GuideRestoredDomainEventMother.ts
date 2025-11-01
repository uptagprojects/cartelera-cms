import { GuideRestoredDomainEvent } from "../../../../../../src/contexts/cma/guides/domain/event/GuideRestoredDomainEvent";
import { GuideIdMother } from "../GuideIdMother";

export class GuideRestoredDomainEventMother {
	static create(id?: string): GuideRestoredDomainEvent {
		return new GuideRestoredDomainEvent(id ?? GuideIdMother.create().value);
	}
}
