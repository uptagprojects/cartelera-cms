import { faker } from "@faker-js/faker";

import { GuidePublishedDomainEvent } from "../../../../../../src/contexts/cma/guides/domain/event/GuidePublishedDomainEvent";

interface GuidePublishedParams {
	id?: string;
	title?: string;
	content?: string;
	ucId?: string;
	authorId?: string;
}

export class GuidePublishedDomainEventMother {
	static create(params?: GuidePublishedParams): GuidePublishedDomainEvent {
		return new GuidePublishedDomainEvent(
			params?.id ?? faker.string.uuid(),
			params?.title ?? faker.lorem.sentence(),
			params?.content ?? faker.lorem.paragraph(),
			params?.ucId ?? faker.string.uuid(),
			params?.authorId ?? faker.string.uuid()
		);
	}
}
