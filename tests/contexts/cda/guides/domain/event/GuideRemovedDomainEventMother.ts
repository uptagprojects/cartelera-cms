import { faker } from "@faker-js/faker";

import { GuideRemovedDomainEvent } from "../../../../../../src/contexts/cma/guides/domain/event/GuideRemovedDomainEvent";
import { GuideIdMother } from "../GuideIdMother";

export class GuideRemovedDomainEventMother {
	static create(params?: { id?: string; ucId?: string }): GuideRemovedDomainEvent {
		return new GuideRemovedDomainEvent(
			params?.id ?? GuideIdMother.create().value,
			params?.ucId ?? faker.string.uuid()
		);
	}
}
