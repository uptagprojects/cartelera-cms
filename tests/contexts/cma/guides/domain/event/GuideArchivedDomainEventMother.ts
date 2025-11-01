import { GuideArchivedDomainEvent } from "../../../../../../src/contexts/cma/guides/domain/event/GuideArchivedDomainEvent";
import { UCIdMother } from "../../../uc/domain/UCIdMother";
import { GuideIdMother } from "../GuideIdMother";

export class GuideArchivedDomainEventMother {
	static create(id?: string, ucId?: string): GuideArchivedDomainEvent {
		return new GuideArchivedDomainEvent(
			id ?? GuideIdMother.create().value,
			ucId ?? UCIdMother.create().value
		);
	}
}
