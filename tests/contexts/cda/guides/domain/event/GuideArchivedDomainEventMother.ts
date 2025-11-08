import { faker } from "@faker-js/faker";

import { GuideArchivedDomainEvent } from "../../../../../../src/contexts/cma/guides/domain/event/GuideArchivedDomainEvent";
import { GuideIdMother } from "../GuideIdMother";

export class GuideArchivedDomainEventMother {
	static create(params?: { id?: string; ucId?: string }): GuideArchivedDomainEvent {
		return new GuideArchivedDomainEvent(
			params?.id ?? GuideIdMother.create().value,
			params?.ucId ?? faker.string.uuid()
		);
	}
}
