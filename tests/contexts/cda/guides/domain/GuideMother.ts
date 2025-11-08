import { faker } from "@faker-js/faker";

import { Guide, GuidePrimitives } from "../../../../../src/contexts/cda/guides/domain/Guide";
import { GuideContentMother } from "./GuideContentMother";
import { GuideIdMother } from "./GuideIdMother";
import { GuideTitleMother } from "./GuideTitleMother";
import { ProfessorMother } from "./ProfessorMother";

export class GuideMother {
	static create(params?: Partial<GuidePrimitives>): Guide {
		const primitives: GuidePrimitives = {
			id: GuideIdMother.create().value,
			title: GuideTitleMother.create().value,
			content: GuideContentMother.create().value,
			contentWrapped: GuideContentMother.create().value,
			area: faker.lorem.word(),
			professor: ProfessorMother.create(),
			publishDate: new Date().toISOString(),
			attachments: [],
			...params
		};

		return Guide.fromPrimitives(primitives);
	}
}
