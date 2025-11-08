import { faker } from "@faker-js/faker";

import { GuidePublishedDomainEvent } from "../../../../../../src/contexts/cma/guides/domain/event/GuidePublishedDomainEvent";
import { GuideContentMother } from "../GuideContentMother";
import { GuideIdMother } from "../GuideIdMother";
import { GuideTitleMother } from "../GuideTitleMother";

export class GuidePublishedDomainEventMother {
	static create(params?: {
		id?: string;
		title?: string;
		content?: string;
		ucId?: string;
		authorId?: string;
	}): GuidePublishedDomainEvent {
		return new GuidePublishedDomainEvent(
			params?.id ?? GuideIdMother.create().value,
			params?.title ?? GuideTitleMother.create().value,
			params?.content ?? GuideContentMother.create().value,
			params?.ucId ?? faker.string.uuid(),
			params?.authorId ?? faker.string.uuid()
		);
	}
}
