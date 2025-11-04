import { GuideArchivedDomainEvent } from "../../../../../../src/contexts/cma/guides/domain/events/GuideArchivedDomainEvent";
import { GuidePrimitives } from "../../../../../../src/contexts/cma/guides/domain/Guide";
import { UCIdMother } from "../../../uc/domain/UCIdMother";
import { GuideIdMother } from "../GuideIdMother";

export class GuideArchivedDomainEventMother {
	static create(params?: Partial<GuidePrimitives>): GuideArchivedDomainEvent {
		return new GuideArchivedDomainEvent(
			GuideIdMother.create(params?.id).value,
			UCIdMother.create(params?.ucId).value
		);
	}
}
